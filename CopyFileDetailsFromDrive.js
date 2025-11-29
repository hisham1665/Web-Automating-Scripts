(function() {
  // Get all file elements in the Drive folder list
  const fileNodes = [...document.querySelectorAll('[data-id][data-target="doc"]')];

  const links = fileNodes.map(node => {
    const fileId = node.getAttribute("data-id");
    const fileName = node.getAttribute("aria-label") || "Unknown";
    const shareLink = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;

    return {
      name: fileName,
      id: fileId,
      link: shareLink
    };
  });

  console.log("Extracted File Links: ");
  console.log(links);
  console.log(JSON.stringify(links, null, 2)); // formatted array output
})();
