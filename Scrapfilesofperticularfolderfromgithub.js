(async () => {
  // =========================
  // CONFIG
  // =========================

  const FILE_LOAD_DELAY = 3000;     // wait after opening each file
  const DOWNLOAD_DELAY = 2000;      // wait after clicking download
  const CLICK_SETTLE_DELAY = 500;

  const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

  // =========================
  // FIND DOCS FOLDER
  // =========================

  const docsFolder = document.querySelector('#docs-item');

  if (!docsFolder) {
    console.error('❌ Could not find #docs-item');
    return;
  }

  const docsList = docsFolder.querySelector(
    ':scope > ul[role="group"][aria-label="docs"]'
  );

  if (!docsList) {
    console.error('❌ docs folder is not expanded.');
    console.log('Expand the docs folder and run the script again.');
    return;
  }

  // =========================
  // COLLECT FILE IDs
  // =========================

  // IMPORTANT:
  // Store IDs instead of DOM elements because GitHub/React may
  // replace the sidebar elements after opening another file.

  const files = [...docsList.querySelectorAll(':scope > li[role="treeitem"]')]
    .map(item => ({
      id: item.id,
      path: item.id?.endsWith('-item')
        ? item.id.slice(0, -5)
        : null
    }))
    .filter(file =>
      file.id &&
      file.path &&
      file.path.startsWith('docs/') &&
      file.path.toLowerCase().endsWith('.md')
    );

  if (!files.length) {
    console.error('❌ No .md files found inside docs.');
    return;
  }

  console.log(`📚 Found ${files.length} markdown files.`);
  console.table(files.map((f, i) => ({
    number: i + 1,
    file: f.path
  })));

  // =========================
  // PROCESS FILES
  // =========================

  let downloaded = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {

    const file = files[i];

    console.log('');
    console.log('================================');
    console.log(`📄 [${i + 1}/${files.length}] ${file.path}`);

    // Re-find element because GitHub may rerender sidebar
    const item = document.getElementById(file.id);

    if (!item) {
      console.warn(`⚠️ Cannot find ${file.id}`);
      failed++;
      continue;
    }

    // =========================
    // CLICK FILE
    // =========================

    const clickable =
      item.querySelector('[class*="TreeView-item-content"]') ||
      item;

    console.log(`👉 Opening ${file.path}`);

    clickable.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    await sleep(CLICK_SETTLE_DELAY);

    clickable.click();

    // =========================
    // WAIT FOR FILE
    // =========================

    console.log(`⏳ Waiting ${FILE_LOAD_DELAY / 1000}s...`);

    await sleep(FILE_LOAD_DELAY);

    // =========================
    // FIND DOWNLOAD BUTTON
    // =========================

    let downloadButton = document.querySelector(
      'button[data-testid="download-raw-button"]'
    );

    // Give GitHub another chance if rendering is slow
    if (!downloadButton) {

      console.log('⏳ Download button not ready. Waiting 2 more seconds...');

      await sleep(2000);

      downloadButton = document.querySelector(
        'button[data-testid="download-raw-button"]'
      );
    }

    if (!downloadButton) {

      console.error(
        `❌ Download button not found for ${file.path}`
      );

      failed++;
      continue;
    }

    // =========================
    // DOWNLOAD
    // =========================

    console.log(`⬇️ Downloading ${file.path}`);

    downloadButton.click();

    downloaded++;

    console.log(
      `✅ ${file.path} — download triggered`
    );

    // Don't hammer GitHub/browser downloads
    await sleep(DOWNLOAD_DELAY);
  }

  // =========================
  // FINISHED
  // =========================

  console.log('');
  console.log('================================');
  console.log('🎉 FINISHED');
  console.log(`📚 Total: ${files.length}`);
  console.log(`✅ Download triggered: ${downloaded}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('================================');

})();
