const input = document.getElementById('color-input');
const example = document.getElementById('example');

input.addEventListener('change', async (e) => {
    const colorRGB = hexToRgb(e.target.value);
    console.log('Value hex: ', e.target.value);
    console.log('Value: ', colorRGB);

    example.style.background = e.target.value;

    fetch('http://localhost:3000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(colorRGB)
    })
    .then(res => res.json())
    .then(result => {
      
      if(result.result) {
        example.style.color = 'white';
      } else {
        example.style.color = 'black';
      }
    });

});


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}