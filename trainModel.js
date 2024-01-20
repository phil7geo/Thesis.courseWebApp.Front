const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Example data (replace with your dataset)
const data = [
    {
        input: 'Beginner WebDevelopment Asynchronous English Long-Term OnSale 193-986 WithCertification Rating3.9',
        label: 1, // Use numerical labels, e.g., 0 and 1
    },
    // Add more examples as needed
];

const tokenToNumericValue = (token) => {
    const tokenDictionary = {
        'Beginner': 1,
        'WebDevelopment': 2,
        'Asynchronous': 3,
        'Synchronous': 4,
        'English': 5,
        'Long-Term': 6,
        'OnSale': 7,
        '193-986': 8,
        'WithCertification': 9,
        'Rating3.9': 10,
        // Add more tokens as needed
    };
    return tokenDictionary[token] || 0;
};

const preprocessData = (data) => {
    return data.map(entry => ({
        input: entry.input.split(' ').map(tokenToNumericValue),
        label: entry.label,
    }));
};

const processedData = preprocessData(data);

const inputSize = processedData[0].input.length;
const outputSize = 2; // Modify based on your specific output size (number of classes)

// Define the model
const model = tf.sequential();
model.add(tf.layers.simpleRNN({ units: 64, activation: 'relu', inputShape: [inputSize] }));
model.add(tf.layers.dense({ units: outputSize, activation: 'sigmoid' })); // Use 'sigmoid' for binary classification

// Compile the model
model.compile({
    optimizer: 'adam',
    loss: 'binaryCrossentropy', // Use 'binaryCrossentropy' for binary classification
    metrics: ['accuracy'],
});

// Convert data to tensors
const xs = tf.tensor2d(processedData.map(entry => entry.input));
const ys = tf.oneHot(processedData.map(entry => entry.label), outputSize); // Use numerical labels

// Train the model
model.fit(xs, ys, { epochs: 10 })
    .then(info => {
        console.log('Model training complete:', info);

        // Save the model architecture and weights
        model.save('file://public/model/model.json');
    })
    .catch(error => console.error('Error during training:', error));
