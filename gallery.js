(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const dialog = $("galleryDialog");
  const feed = $("galleryFeed");
  const form = $("gallerySubmitForm");
  const notice = $("galleryNotice");
  const submitButton = $("gallerySubmitButton");
  let session = null;
  let activeFilter = "all";
  let profileDirectory = [];
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const badgeInfo = {
    baby_star: {label:"Baby-Star", icon:"★", cls:"badge-baby"},
    young_moon: {label:"Young-Moon", icon:"☾", cls:"badge-moon"},
    exoplanet: {label:"Exoplanet", icon:"♃", cls:"badge-exoplanet"},
    creator_verified: {label:"Creator Verified", icon:"✓", cls:"badge-creator"}
  };
  const setNotice = (text, type="") => {
    if (!notice) return;
    notice.textContent = text || "";
    notice.dataset.type = type;
  };
  const publicIdFor = (userId) => profileDirectory.find(p => p.id === userId)?.public_id || "Creator";
  const nameFor = (userId) => {
    const p = profileDirectory.find(item => item.id === userId);
    return p ? [p.first_name,p.last_name].filter(Boolean).join(" ") || p.public_id : "STARSHIP UNIVERSE LEAGUE";
  };
  const renderMentions = (body) => escapeHtml(body).replace(/@([A-Za-z0-9][A-Za-z0-9._-]{2,23})/g, (match, id) => {
    const person = profileDirectory.find(p => p.public_id.toLowerCase() === id.toLowerCase());
    return person ? '<span class="gallery-mention">@' + escapeHtml(person.public_id) + '</span>' : match;
  });
  const badgeHtml = (items=[]) => items.filter(b => badgeInfo[b.badge_key]).map(b => {
    const info = badgeInfo[b.badge_key];
    return '<span class="gallery-user-badge ' + info.cls + '" title="' + info.label + '" aria-label="' + info.label + '">' + info.icon + '</span>';
  }).join("");
  const assetUrl = (path) => {
    if (!path || !window.universeSupabase) return "";
    return window.universeSupabase.storage.from("universe-gallery").getPublicUrl(path).data.publicUrl;
  };
  const renderPost = (post, stats, comments, userBadges) => {
    const official = post.source_type === "official";
    const author = official ? "STARSHIP UNIVERSE LEAGUE" : nameFor(post.author_id);
    const publicId = official ? "OFFICIAL" : "@" + publicIdFor(post.author_id);
    const path = post.asset_path || "";
    const url = assetUrl(path);
    const isImage = /\.(png|jpe?g|webp|gif)$/i.test(path);
    const fileName = path.split("/").pop() || "Descargar recurso";
    const commentMarkup = comments.map(comment => {
      const commentAuthor = nameFor(comment.author_id);
      const commentId = publicIdFor(comment.author_id);
      const badges = userBadges[comment.author_id] || [];
      return '<div class="gallery-comment"><div><strong>' + escapeHtml(commentAuthor) + '</strong> <span>@' + escapeHtml(commentId) + '</span>' + badgeHtml(badges) + '</div><p>' + renderMentions(comment.body) + '</p></div>';
    }).join("");
    return '<article class="gallery-post" data-post-id="' + post.id + '">' +
      '<div class="gallery-post-head"><div class="gallery-post-avatar">' + (official ? "✦" : escapeHtml((publicIdFor(post.author_id)||"U").slice(0,1).toUpperCase())) + '</div><div class="gallery-post-author"><strong>' + escapeHtml(author) + ' ' + badgeHtml(userBadges[post.author_id] || []) + '</strong><small>' + escapeHtml(publicId) + ' · ' + (official ? "Publicación oficial" : "Comunidad") + '</small></div><span class="gallery-post-category">' + escapeHtml(post.category.replaceAll("_"," ").toUpperCase()) + '</span></div>' +
      '<div class="gallery-post-copy"><h3>' + escapeHtml(post.title) + '</h3><p>' + escapeHtml(post.description || "") + '</p></div>' +
      (url ? (isImage ? '<a class="gallery-asset-image" href="' + escapeHtml(url) + '" target="_blank" rel="noopener"><img src="' + escapeHtml(url) + '" alt="' + escapeHtml(post.title) + '" loading="lazy"></a>' : '<a class="gallery-download" href="' + escapeHtml(url) + '" target="_blank" rel="noopener" download><span>↧</span><span><b>' + escapeHtml(fileName) + '</b><small>Descargar recurso</small></span></a>') : "") +
      '<div class="gallery-post-actions"><button type="button" class="gallery-starlight ' + (stats.liked ? "is-active" : "") + '" data-starlight="' + post.id + '" aria-pressed="' + String(stats.liked) + '"><span class="starlight-heart">' + (stats.liked ? "♥" : "♡") + '</span><span>' + (stats.liked ? "Starlight esparcido" : "Esparcir Starlight") + '</span><b>' + stats.starlights + '</b></button><span class="gallery-comment-count">♡ ' + comments.length + ' comentarios</span></div>' +
      '<div class="gallery-comments">' + (commentMarkup || '<p class="gallery-no-comments">Sé la primera persona en comentar.</p>') + '</div>' +
      '<form class="gallery-comment-form" data-comment-form="' + post.id + '"><input name="body" maxlength="2000" placeholder="Escribe un comentario… usa @ID para etiquetar" required><button type="submit" aria-label="Publicar comentario">↗</button></form>' +
      '</article>';
  };
  async function loadGallery() {
    const client = window.universeSupabase;
    if (!client || !session?.user) return;
    feed.innerHTML = '<p class="gallery-loading">Cargando Gallery…</p>';
    const [postsResult, directoryResult, badgesResult] = await Promise.all([
      client.from("gallery_posts").select("*").eq("status","published").order("published_at",{ascending:false}).limit(40),
      client.from("public_profile_directory").select("id,public_id,first_name,last_name,bio"),
      client.from("user_badges").select("user_id,badge_key,status").eq("status","active")
    ]);
    if (postsResult.error) { feed.innerHTML = '<p class="gallery-empty">No pudimos cargar Gallery. ' + escapeHtml(postsResult.error.message) + '</p>'; return; }
    profileDirectory = directoryResult.data || [];
    const badgesByUser = {};
    (badgesResult.data || []).forEach(item => (badgesByUser[item.user_id] ||= []).push(item));
    let posts = postsResult.data || [];
    if (activeFilter !== "all") posts = posts.filter(post => post.category === activeFilter);
    if (!posts.length) {
      feed.innerHTML = '<div class="gallery-empty"><span>✦</span><h3>Este universo está esperando sus primeras creaciones.</h3><p>Los recursos publicados por el equipo y la comunidad aparecerán aquí.</p></div>';
      return;
    }
    const ids = posts.map(post => post.id);
    const [starlightsResult, commentsResult, myLikesResult] = await Promise.all([
      client.from("gallery_starlights").select("post_id,user_id").in("post_id",ids),
      client.from("gallery_comments").select("*").in("post_id",ids).order("created_at",{ascending:true}),
      client.from("gallery_starlights").select("post_id").eq("user_id",session.user.id).in("post_id",ids)
    ]);
    const starlights = starlightsResult.data || [];
    const comments = commentsResult.data || [];
    const myLikes = new Set((myLikesResult.data || []).map(item => item.post_id));
    feed.innerHTML = posts.map(post => {
      const postComments = comments.filter(comment => comment.post_id === post.id);
      const count = starlights.filter(item => item.post_id === post.id).length;
      return renderPost(post,{starlights:count,liked:myLikes.has(post.id)},postComments,badgesByUser);
    }).join("");
  }
  async function uploadCommunityPost(event) {
    event.preventDefault();
    const client = window.universeSupabase;
    if (!client || !session?.user) { setNotice("Inicia sesión para publicar recursos.","error"); return; }
    const data = new FormData(form);
    const file = data.get("asset");
    if (!(file instanceof File) || !file.size) { setNotice("Selecciona un archivo para compartir.","error"); return; }
    if (file.size > 50 * 1024 * 1024) { setNotice("El archivo supera el límite de 50 MB.","error"); return; }
    const title = String(data.get("title") || "").trim();
    if (title.length < 3) { setNotice("El título debe tener al menos 3 caracteres.","error"); return; }
    submitButton.disabled = true;
    setNotice("Subiendo recurso y enviándolo a revisión…");
    try {
      const ext = (file.name.split(".").pop() || "bin").replace(/[^a-z0-9]/gi,"").toLowerCase();
      const path = session.user.id + "/" + crypto.randomUUID() + "." + ext;
      const {error:uploadError} = await client.storage.from("universe-gallery").upload(path,file,{upsert:false,contentType:file.type || "application/octet-stream"});
      if (uploadError) throw uploadError;
      const {error:postError} = await client.from("gallery_posts").insert({
        author_id:session.user.id,source_type:"community",status:"pending",
        category:String(data.get("category") || "other"),title,
        description:String(data.get("description") || "").trim(),asset_path:path
      });
      if (postError) {
        await client.storage.from("universe-gallery").remove([path]);
        throw postError;
      }
      form.reset();
      $("galleryUploadPanel").hidden = true;
      setNotice("¡Recurso enviado! Aparecerá en Gallery cuando el equipo lo apruebe.","success");
    } catch (error) { setNotice(error.message || "No se pudo enviar el recurso.","error"); }
    finally { submitButton.disabled = false; }
  }
  async function toggleStarlight(button) {
    const client = window.universeSupabase;
    if (!session?.user) { setNotice("Inicia sesión para esparcir Starlight.","error"); return; }
    const postId = button.dataset.starlight;
    button.disabled = true;
    try {
      if (button.getAttribute("aria-pressed") === "true") {
        const {error} = await client.from("gallery_starlights").delete().eq("post_id",postId).eq("user_id",session.user.id);
        if (error) throw error;
      } else {
        const {error} = await client.from("gallery_starlights").insert({post_id:postId,user_id:session.user.id});
        if (error && error.code !== "23505") throw error;
      }
      await loadGallery();
    } catch (error) { setNotice(error.message || "No se pudo actualizar Starlight.","error"); }
    finally { button.disabled = false; }
  }
  async function submitComment(event) {
    const formEl = event.target.closest("[data-comment-form]");
    if (!formEl) return;
    event.preventDefault();
    if (!session?.user) { setNotice("Inicia sesión para comentar.","error"); return; }
    const postId = formEl.dataset.commentForm;
    const body = new FormData(formEl).get("body").toString().trim();
    if (!body) return;
    const button = formEl.querySelector("button");
    button.disabled = true;
    try {
      const {data,error} = await window.universeSupabase.from("gallery_comments").insert({post_id:postId,author_id:session.user.id,body}).select("id").single();
      if (error) throw error;
      const matches = [...body.matchAll(/@([A-Za-z0-9][A-Za-z0-9._-]{2,23})/g)];
      const directory = profileDirectory;
      const mentioned = [...new Map(matches.map(match => {
        const person = directory.find(p => p.public_id.toLowerCase() === match[1].toLowerCase());
        return person ? [person.id,{comment_id:data.id,mentioned_user_id:person.id,mentioned_public_id:person.public_id}] : [null,null];
      }).filter(item => item[0]).map(item => item[1]).map(item => [item.mentioned_user_id,item])).values()];
      if (mentioned.length) {
        const {error:mentionError} = await window.universeSupabase.from("gallery_mentions").insert(mentioned);
        if (mentionError) console.warn("Mention registration:",mentionError.message);
      }
      await loadGallery();
    } catch (error) { setNotice(error.message || "No se pudo publicar el comentario.","error"); }
    finally { button.disabled = false; }
  }
  $("galleryOpen")?.addEventListener("click",() => setTimeout(loadGallery,0));
  $("galleryRefresh")?.addEventListener("click",loadGallery);
  $("galleryUploadToggle")?.addEventListener("click",() => { $("galleryUploadPanel").hidden = !$("galleryUploadPanel").hidden; });
  $("galleryClose")?.addEventListener("click",() => dialog?.close());
  $("galleryCategoryFilters")?.addEventListener("click",event => {
    const button = event.target.closest("[data-gallery-filter]");
    if (!button) return;
    activeFilter = button.dataset.galleryFilter;
    $("galleryCategoryFilters").querySelectorAll("button").forEach(item => item.classList.toggle("active",item===button));
    loadGallery();
  });
  form?.addEventListener("submit",uploadCommunityPost);
  feed?.addEventListener("click",event => {
    const button = event.target.closest("[data-starlight]");
    if (button) toggleStarlight(button);
  });
  feed?.addEventListener("submit",submitComment);
  window.addEventListener("universe-auth-change",event => {
    session = event.detail?.session || null;
    if (session && dialog?.open) loadGallery();
  });
  window.addEventListener("universe-profile-updated",loadGallery);
})();