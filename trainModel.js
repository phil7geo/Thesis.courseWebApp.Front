const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Example data (replace with your dataset)
const data = [
    { input: 'user input 1', label: 'recommended course 1' },
    { input: 'user input 2', label: 'recommended course 2' },
    // Add more data entries
];

const inputSize = 10;   // 10 input features
const outputSize = 2;   // Binary classification: recommended or not


// Preprocess the data (tokenization, etc.)
const processedData = data.map(entry => ({
    input: tokenize(entry.input),
    label: entry.label,
}));

// Define the model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [inputSize], units: 64, activation: 'relu' }));
model.add(tf.layers.dense({ units: outputSize, activation: 'softmax' }));

// Compile the model
model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
});

// Convert data to tensors
const xs = tf.tensor2d(processedData.map(entry => entry.input));
const ys = tf.oneHot(processedData.map(entry => entry.label), outputSize);

// Train the model
model.fit(xs, ys, { epochs: 10 })
    .then(info => {
        console.log('Model training complete:', info);

        // Save the model architecture and weights
        model.save('file://public/model/model.json');
    })
    .catch(error => console.error('Error during training:', error));

// Tokenization function (replace with your preprocessing logic)
function tokenize(input) {
    return input.split(' ').map(word => parseFloat(word)); // Example: simple word-to-number mapping
}
