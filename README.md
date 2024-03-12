# AHQ Store Action

Upload apps to the @ahqstore/apps repo

## Usage

```yaml
- name: Build
  uses: ahqstore/upload-app@v0.1.0
  with:
    release: 'release id' # GH Release Id to search through
    upload: true # Set to False if you don't want to upload to ahqstore/apps repo
  env:
    GH_TOKEN: ${{ secrets.PAT_G_H }} # Use GitHub Token if you set upload to false
```
