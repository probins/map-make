  var statusDiv = document.createElement('div');
  statusDiv.id = 'status';
  statusDiv.style.textAlign = 'center';
  statusDiv.innerHTML = 'Building map, please wait ...'; // FIXME English
  document.body.appendChild(statusDiv);

module.exports = {
  hide: function() {
    statusDiv.style.display = 'none';
  }
};
