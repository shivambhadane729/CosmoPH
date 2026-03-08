"""
CosmoPH - Dataset Download Script
Downloads required datasets for the project.
Run: python scripts/download_datasets.py
"""
import os, sys, urllib.request, hashlib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_DIR = BASE_DIR / "dataset"

DATASETS = [
    {
        "name": "Planck Commander CMB Map (Full Sky)",
        "url": "https://irsa.ipac.caltech.edu/data/Planck/release_3/all-sky-maps/maps/component-maps/cmb/COM_CMB_IQU-commander_2048_R3.00_full.fits",
        "save_dir": DATASET_DIR / "raw",
        "filename": "COM_CMB_IQU-commander_2048_R3.00_full.fits",
        "required_for": "Optional (large file, ~1.6GB)",
        "category": "raw input",
    },
    {
        "name": "Planck Common Mask",
        "url": "https://irsa.ipac.caltech.edu/data/Planck/release_2/ancillary-data/masks/COM_Mask_CMB-common-Mask-Int_2048_R3.00.fits",
        "save_dir": DATASET_DIR / "raw",
        "filename": "COM_Mask_CMB-common-Mask-Int_2048_R3.00.fits",
        "required_for": "Optional (mask for full-sky maps)",
        "category": "mask",
    },
]

def download_file(url: str, save_path: Path):
    if save_path.exists():
        print(f"  ✅ Already exists: {save_path.name}")
        return
    print(f"  ⬇️  Downloading: {url}")
    print(f"     → {save_path}")
    save_path.parent.mkdir(parents=True, exist_ok=True)
    urllib.request.urlretrieve(url, str(save_path))
    size_mb = save_path.stat().st_size / (1024 * 1024)
    print(f"  ✅ Downloaded: {save_path.name} ({size_mb:.1f} MB)")

def generate_demo_data():
    """Generate all demo/sample datasets locally."""
    import numpy as np
    from scipy.ndimage import gaussian_filter

    sample_dir = DATASET_DIR / "sample"
    sample_dir.mkdir(parents=True, exist_ok=True)

    # 1. Gaussian random field
    path = sample_dir / "gaussian_sample_nside64.npy"
    if not path.exists():
        np.random.seed(42)
        data = gaussian_filter(np.random.normal(0, 1, (64, 64)), sigma=2.0) * 1e-5
        np.save(str(path), data)
        print(f"  ✅ Generated: {path.name}")

    # 2. Demo CMB patch
    path = sample_dir / "demo_cmb_patch_64x64.npy"
    if not path.exists():
        np.random.seed(123)
        data = gaussian_filter(np.random.normal(0, 1, (64, 64)), sigma=2.0) * 1e-5
        np.save(str(path), data)
        print(f"  ✅ Generated: {path.name}")

    # 3. Non-Gaussian patch
    path = sample_dir / "demo_non_gaussian_patch_64x64.npy"
    if not path.exists():
        np.random.seed(456)
        g = gaussian_filter(np.random.normal(0, 1, (64, 64)), sigma=2.0) * 1e-5
        ng = g + (np.random.normal(0, 1, (64, 64))**2 - 1) * 3e-6
        ng[20:25, 30:35] += 5e-5
        ng[40:45, 10:15] -= 4e-5
        np.save(str(path), ng)
        print(f"  ✅ Generated: {path.name}")

def main():
    print("=" * 60)
    print("CosmoPH Dataset Setup")
    print("=" * 60)

    # Create directories
    for sub in ["raw", "sample", "processed", "external", "metadata", "outputs"]:
        (DATASET_DIR / sub).mkdir(parents=True, exist_ok=True)
    print("\n📁 Dataset directories created.")

    # Generate demo data (always)
    print("\n🧪 Generating demo/sample datasets...")
    generate_demo_data()

    # Ask about downloading large files
    print("\n📡 Optional: Download Planck datasets (large files)?")
    print("   These are needed for full-sky analysis but NOT for the demo.")
    answer = input("   Download? (y/N): ").strip().lower()

    if answer == 'y':
        for ds in DATASETS:
            print(f"\n📦 {ds['name']} ({ds['required_for']})")
            save_path = ds["save_dir"] / ds["filename"]
            download_file(ds["url"], save_path)
    else:
        print("   Skipped. You can run this script later to download them.")

    print("\n✅ Dataset setup complete!")
    print(f"   Location: {DATASET_DIR}")

if __name__ == "__main__":
    main()
