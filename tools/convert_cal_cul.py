"""Convert the two CAL/CUL source FBX characters to browser-ready GLB.
Run: blender --background --python tools/convert_cal_cul.py -- --source ./CAL_CUL_converted --output ./assets/cal-cul/models
Requires Blender 4.2+.
"""
import bpy, os, sys, argparse, glob, json
def arguments():
    a=sys.argv; a=a[a.index("--")+1:] if "--" in a else []
    p=argparse.ArgumentParser(); p.add_argument("--source",required=True); p.add_argument("--output",required=True); return p.parse_args(a)
def clear():
    bpy.ops.object.select_all(action="SELECT"); bpy.ops.object.delete(use_global=False)
    for collection in (bpy.data.meshes,bpy.data.curves,bpy.data.armatures,bpy.data.materials,bpy.data.images):
        for block in list(collection):
            try: collection.remove(block)
            except Exception: pass
def relink(folder):
    index={}
    for p in glob.glob(os.path.join(folder,"**","*.webp"),recursive=True):
        n=os.path.basename(p).lower(); index[n]=p; index[(os.path.splitext(n)[0]+".bmp")]=p
    count=0; missing=[]
    for img in bpy.data.images:
        name=os.path.basename(bpy.path.abspath(img.filepath)).lower()
        target=index.get(name)
        if target:
            try: img.filepath=target; img.reload(); count+=1
            except Exception: missing.append(name)
        elif img.source=="FILE" and not os.path.exists(bpy.path.abspath(img.filepath)): missing.append(name)
    return count,sorted(set(missing))
def convert(slug,src,out):
    folder=os.path.join(src,slug); fbx=os.path.join(folder,"blender.Fbx")
    if not os.path.isfile(fbx): raise FileNotFoundError(fbx)
    clear(); bpy.ops.import_scene.fbx(filepath=fbx,use_image_search=True,automatic_bone_orientation=False)
    linked,missing=relink(folder); os.makedirs(out,exist_ok=True)
    target=os.path.join(out,f"lyrie_{slug}.glb")
    bpy.ops.export_scene.gltf(filepath=target,export_format="GLB",export_image_format="AUTO",export_animations=True,export_skins=True,export_morph=True,export_materials="EXPORT",export_cameras=False,export_lights=False)
    report={"character":slug,"glb":os.path.basename(target),"bytes":os.path.getsize(target),"textures_relinked":linked,"unresolved_images":missing}
    with open(os.path.join(out,f"lyrie_{slug}.report.json"),"w",encoding="utf-8") as f: json.dump(report,f,ensure_ascii=False,indent=2)
    print(report)
if __name__=="__main__":
    a=arguments()
    for g in ("male","female"): convert(g,a.source,a.output)
