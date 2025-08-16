(async () => {
  console.log('🚀 Starting to extract YouTube playlist URLs...');

  // Use a delay to ensure all elements are loaded, as YouTube pages are dynamic.
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(2000);

  // --- Find and Extract the Links ---
  // A more specific selector is needed to only target videos within the playlist container.
  // The '#playlist-contents' ID identifies the main playlist section.
  const playlistContainer = document.querySelector('ytd-playlist-video-list-renderer');
  
  if (!playlistContainer) {
    console.error('❌ Playlist container not found. Make sure you are on a YouTube playlist page.');
    return;
  }

  // Now, find all the video title links within the specific container.
  const videoElements = playlistContainer.querySelectorAll('ytd-playlist-video-renderer a#video-title');
  
  if (videoElements.length === 0) {
    console.error('❌ No video links found within the playlist container. Something may have changed on the page.');
    return;
  }

  const videoUrls = [];

  // Iterate over each video element and extract its 'href' attribute.
  for (const element of videoElements) {
    const url = element.href;
    if (url) {
      videoUrls.push(url);
    }
  }

  // --- Display the Results ---
  console.log(`✅ Found and extracted ${videoUrls.length} video URLs.`);
  console.log('Copy the array below:');
  console.log(videoUrls);
  console.log('🎯 Extraction complete!');
})();
