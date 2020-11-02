function copyToClipboard() {
  var from = document.getElementById("short_link");
  var range = document.createRange();
  window.getSelection().removeAllRanges();
  range.selectNode(from);
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  const button = document.getElementById("copy_btn");
  button.innerHTML = "copied!";
}
