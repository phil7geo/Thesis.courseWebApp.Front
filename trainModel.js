//  training an RNN model with TensorFlow.js. Includes data preprocessing, model construction, training, and saving the trained model to a json file.

const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// course data
const data = [
    {
        input: 'Beginner WebDevelopment Asynchronous English Long-Term OnSale 193-986 WithCertification Rating3.9',
        label: 1, 
    },
    {
        input: 'Intermediate Physics Asynchronous English Short-Term OnSale 170-286 WithCertification Rating4.9',
        label: 2,
    },
    {
        input: 'Advanced Mathematics Asynchronous English 3months null 91-99 WithCertification Rating2.5',
        label: 3,
    },
    {
        input: 'Intermediate History Asynchronous English 6months null 50-60 WithCertification Rating4.9',
        label: 4,
    },
    {
        input: 'Beginner Psychology Asynchronous English Long-Term OnSale 65-100 WithCertification Rating2.9',
        label: 5,
    },
    {
        input: 'Advanced WebDevelopment Asynchronous English Short-Term OnSale 250-280 WithCertification Rating1.5',
        label: 6,
    },
];

// Tokenize and encode the inputs
let tokenizer = {
    wordIndex: {},
    index: 1,
};

function tokenize(text) {
    return text.toLowerCase().split(/\s+/);
}

function encode(tokens) {
    return tokens.map(token => {
        if (!tokenizer.wordIndex[token]) {
            tokenizer.wordIndex[token] = tokenizer.index++;
        }
        return tokenizer.wordIndex[token];
    });
}

const sequences = data.map(item => encode(tokenize(item.input)));
const labels = data.map(item => item.label);

// Determine max sequence length for padding
const maxSeqLength = sequences.reduce((prev, curr) => (curr.length > prev ? curr.length : prev), 0);

// Pad sequences
const paddedSequences = sequences.map(seq => {
    while (seq.length < maxSeqLength) {
        seq.push(0);
    }
    return seq;
});

// Prepare tensors
const xs = tf.tensor2d(paddedSequences);
const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), 2); // Adjust the '2' based on the number of categories

// Define the model
const model = tf.sequential();
model.add(tf.layers.embedding({
    inputDim: tokenizer.index, // Size of the vocabulary
    outputDim: 50, // Dimension of the dense embedding
    inputLength: maxSeqLength // Length of input sequences
}));
model.add(tf.layers.simpleRNN({
    units: 64,
    returnSequences: false
}));
model.add(tf.layers.dense({
    units: 2, // Adjust based on the number of categories
    activation: 'softmax'
}));

// Compile the model
model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
});

// Train the model
async function train() {
    await model.fit(xs, ys, {
        epochs: 10,
        callbacks: tf.callbacks.earlyStopping({ patience: 2 })
    });

    // Save the model
    await model.save('file://./model');
}

train().then(() => console.log('Training complete')).catch(err => console.error(err));
