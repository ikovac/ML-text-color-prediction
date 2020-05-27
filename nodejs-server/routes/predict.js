const express = require('express');
const tf = require('@tensorflow/tfjs-node');

const router = express.Router();

router.post('/predict', async (req, res) => {
    const colorRGB = req.body;
    const result = await makePrediction(colorRGB);
    
    res.json({result});
});

async function makePrediction(colorRGB) {
    const model = await tf.loadLayersModel('file://../my-model/model.json');

    const {r, g, b} = normalizeFeatures(colorRGB);
    const dataSet = tf.tensor([[r, g, b]]);
    const prediction = model.predict(dataSet);
    const predict_output = Array.from(prediction.dataSync());
    // const x = tf.tensor1d(predict_output);
    const result = await tf.argMax(predict_output).data();
    return result[0];
}

function normalizeFeatures(colorRGB) {
    const {r, g, b} = colorRGB;
    return {
        r: r/255.0,
        g: g/255.0,
        b: b/255.0
    };
}

module.exports = router;