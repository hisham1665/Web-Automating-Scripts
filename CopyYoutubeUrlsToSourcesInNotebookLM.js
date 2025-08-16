(async () => {
  // ----------------------------------------------------
  // 👉 SCRIPT CONFIGURATION
  // Add your list of YouTube URLs here.
  // ----------------------------------------------------
  const urls = [
    "https://www.youtube.com/watch?v=d3GOk5K05Ow",
    "https://www.youtube.com/watch?v=wYzEWEIENUE",
    "https://www.youtube.com/watch?v=m9hm1ctTL6s",
    "https://www.youtube.com/watch?v=9I-mB65tJ0k",
    "https://www.youtube.com/watch?v=6J_G4_n2T3Y",
    "https://www.youtube.com/watch?v=uC_IqU8-86g",
    // Add more URLs as needed
  ];

  // Helper function to wait for a specific duration.
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  
  // New helper function to wait for an element to appear.
  const waitForElement = async (selector, timeout = 5000) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const element = document.querySelector(selector);
      if (element) {
        return element;
      }
      await delay(100);
    }
    return null; // Return null if the element is not found within the timeout.
  };

  console.log(`🚀 Starting to add ${urls.length} YouTube sources...`);

  for (let i = 0; i < urls.length; i++) {
    const currentUrl = urls[i];
    console.log(`🔄 Processing ${i + 1} of ${urls.length}: ${currentUrl}`);

    try {
      // ✅ Step 1: Click "+ Add source" button to open the first modal.
      let openBtn = document.querySelector('.add-source-button');
      if (!openBtn) {
        openBtn = Array.from(document.querySelectorAll('button')).find(btn =>
          btn.textContent.trim().toLowerCase().includes('add source')
        );
      }

      if (!openBtn) {
        console.error('❌ "Add source" button not found. Stopping script.');
        break;
      }
      openBtn.click();
      await delay(1500);

      // ✅ Step 2: Find and click the "YouTube" button using a more specific selector.
      // We look for the "mat-chip" and then check its text content.
      const youtubeOption = Array.from(document.querySelectorAll('mat-chip')).find(el =>
          el.textContent.trim().toLowerCase().includes('youtube')
      );

      if (!youtubeOption) {
        console.error('❌ "YouTube" option not found in the modal. Stopping script.');
        break;
      }
      youtubeOption.click();
      await delay(1000); // A small delay after clicking YouTube to let the page start loading the next part.

      // ✅ Step 3: Wait for and then paste the URL into the new input field.
      // We'll now wait for the input field with the specific class name you provided.
      const input = await waitForElement('input.mat-mdc-input-element');
      if (!input) {
         console.error('❌ Input field not found for URL. Stopping script.');
         break;
      }
      input.value = currentUrl;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await delay(1000);

      // ✅ Step 4: Wait for and then click the "Insert" button to submit the URL.
      const confirmBtn = await waitForElement('button[type="submit"]');
      
      if (!confirmBtn) {
        console.error('❌ "Insert" button not found. Stopping script.');
        break;
      }
      
      if (confirmBtn.textContent.trim().toLowerCase() !== 'insert') {
          console.warn('⚠️ Found a button, but text does not match "Insert". Proceeding anyway...');
      }

      confirmBtn.click();
      console.log(`✅ Successfully added: ${currentUrl}`);
      
      await delay(3000); // Wait for the URL to be processed and the modal to close.

    } catch (error) {
      console.error(`🔴 An error occurred while processing ${currentUrl}:`, error);
      console.log('Skipping to the next URL.');
      continue;
    }
  }

  console.log('🎯 All YouTube sources from the list have been processed!');
})();
