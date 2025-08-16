(() => {
    const links = [...document.querySelectorAll('a#video-title')]
        .map(a => 'https://www.youtube.com' + a.getAttribute('href'));
    console.log('Copy the following array and paste it in the next tab:');
    console.log(JSON.stringify(links));
})();
