(() => {
  const month = document.querySelector('select[name="month"]');
  const year = document.querySelector('select[name="year"]');
  const table = document.querySelector("#itsthetable");

  if (!table || !month) {
    console.error("Attendance table or month selector not found.");
    return;
  }

  const monthName = month.options[month.selectedIndex].text;
  const yearValue = year?.value || "";
  const output = [];

  table.querySelectorAll("tbody tr").forEach(row => {
    const date = row.querySelector("th")?.innerText
      .replace(/\s+/g, "")
      .trim();

    row.querySelectorAll("td.absent").forEach(cell => {
      const period =
        [...row.querySelectorAll("td")].indexOf(cell) + 1;

      output.push({
        Month: monthName,
        Date: date,
        Period: `Period ${period}`,
        Subject: cell.innerText.trim().replace(/\s+/g, " ")
      });
    });
  });

  // Convert values to CSV-safe strings
  const escapeCSV = value =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const headers = ["Month", "Date", "Period", "Subject"];

  const csv = [
    headers.map(escapeCSV).join(","),
    ...output.map(row =>
      headers.map(header => escapeCSV(row[header])).join(",")
    )
  ].join("\r\n");

  // Create and download the CSV file
  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download =
    `absent_periods_${monthName}_${yearValue}.csv`
      .replace(/[<>:"/\\|?*\s]+/g, "_");

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  console.log(`Exported ${output.length} absent periods to CSV.`);
})();
