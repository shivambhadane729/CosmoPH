# CosmoPH Dataset Directory

## Folder Structure

| Folder | Purpose | Contents |
|--------|---------|----------|
| `raw/` | Original downloaded datasets | Planck FITS maps, masks |
| `sample/` | Auto-generated demo data | Gaussian/non-Gaussian patches (.npy) |
| `processed/` | Preprocessed data | Extracted, masked, normalized patches |
| `external/` | Third-party data | Any additional external datasets |
| `metadata/` | Dataset metadata | Config files, catalogs, notes |
| `outputs/` | Analysis results | TDA results, export ZIPs, plots |

## Sample Data (Auto-Generated)

These are created by the backend on first startup or via `python scripts/download_datasets.py`:

- `sample/gaussian_sample_nside64.npy` — 64x64 Gaussian random field
- `sample/demo_cmb_patch_64x64.npy` — 64x64 CMB-like patch
- `sample/demo_non_gaussian_patch_64x64.npy` — 64x64 patch with injected non-Gaussianity

## Raw Data (Optional Download)

| File | Size | Source |
|------|------|--------|
| `COM_CMB_IQU-commander_2048_R3.00_full.fits` | ~1.6 GB | Planck PR3 Commander CMB map |
| `COM_Mask_CMB-common-Mask-Int_2048_R3.00.fits` | ~50 MB | Planck common analysis mask |

Download via: `python scripts/download_datasets.py`
