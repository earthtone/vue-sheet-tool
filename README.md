# Vue Sheet Assistant 

![vue logo](./src/assets/logo.png)

Vue App for interfacing with a given Google Sheet.

[sheetsy](https://github.com/TehShrike/sheetsy)
[Vue](https://vuejs.org/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### How to set up your Google Spreadsheet

1. Create a spreadsheet with [Google Sheets](https://docs.google.com/spreadsheets/)
2. Navigate to the "File" menu
3. Click "Publish to the Web"
	- It should default to "Entire Document" + "Web page", which is what you want.
	- The defaults should be fine for "Published content & settings" as well - for maximum easiness, you'll want to "Automatically republish when changes are made".
5. Click "Publish"
6. Close the "Publish to the web" dialog
7. Click the blue "Share" button at the top-right
8. If you want to make it slightly harder for people to find your spreadsheet:
	1. Click "advanced" at the bottom-right of the "Share" dialog
	2. Under "Who has access", click "Change"
	3. Select "On - Anyone with the link"
	4. Click "Save"

That URL is the one you'll use to load content from your page.

### Using a published Google Spreadsheet as a data source

1. Turn the URL into a key
2. Using the key, fetch the top-level workbook containing a list of sheets
3. With the original key and a sheet id from the list, fetch one of the sheets to access its rows
9. Copy the "Link to share"

**Keys are read from the `.env.local` file using the `VUE_APP_UTS_KEY` variable** 
