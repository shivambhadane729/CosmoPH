from fastapi import APIRouter, HTTPException
import os
from pathlib import Path
from app.config import get_settings

router = APIRouter()
settings = get_settings()

@router.get("/resources/{resource_type}")
async def list_resources(resource_type: str):
    if resource_type not in ["scripts", "notebooks", "dataset"]:
        raise HTTPException(status_code=400, detail="Invalid resource type")
    
    base_dir = Path(settings.BASE_DIR) / resource_type
    if not base_dir.exists():
        return {"files": []}
        
    files = []
    for root, _, filenames in os.walk(base_dir):
        for name in filenames:
            rel_dir = os.path.relpath(root, base_dir)
            if rel_dir == ".":
                files.append(name)
            else:
                files.append(f"{rel_dir}/{name}")
                
    return {"files": sorted(files)}

@router.get("/resources/{resource_type}/{file_path:path}")
async def get_resource_content(resource_type: str, file_path: str):
    if resource_type not in ["scripts", "notebooks", "dataset"]:
        raise HTTPException(status_code=400, detail="Invalid resource type")
        
    base_dir = Path(settings.BASE_DIR) / resource_type
    target_file = (base_dir / file_path).resolve()
    
    # Ensure the target file is within the base_dir to prevent path traversal
    try:
        target_file.relative_to(base_dir)
    except ValueError:
        raise HTTPException(status_code=403, detail="Access denied")
        
    if not target_file.exists() or not target_file.is_file():
        raise HTTPException(status_code=404, detail="File not found")
        
    try:
        content = target_file.read_text(encoding='utf-8')
        return {"content": content}
    except Exception as e:
        return {"content": f"[Binary or unreadable file: {e}]"}
