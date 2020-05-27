import tensorflow as tf
from tensorflow import keras

import numpy as np

def normalizeFeatures(features):
    return features / 255.0

labels = ['black', 'white']

X = np.array([
    [255, 255, 255],
    [0, 0, 0],
    [241, 225, 31],
    [65, 17, 255],
    [255, 0, 0],
    [61, 194, 151],
    [27, 27, 171],
    [190, 7, 126],
    [126, 159, 237],
    [217, 208, 147],
    [117, 107, 40],
    [60, 47, 111],
    [21, 98, 55],
    [108, 11, 11],
    [245, 160, 160],
    [202, 232, 174],
    [245, 243, 160],
    [245, 226, 226],
    [131, 10, 13],
    [85, 55, 56],
    [183, 175, 211]
])

y = np.array([0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0])

X = normalizeFeatures(X)
print('X: ', X)

model = keras.Sequential([
    keras.layers.Dense(3, input_shape=(3,)),
    keras.layers.Dense(200, activation='relu'),
    keras.layers.Dense(200, activation='relu'),
    keras.layers.Dense(2, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy', 
    metrics=['accuracy'])

model.fit(X, y, epochs=20)

# test_loss, test_acc = model.evaluate(X,  y, verbose=1) 
# print('Test accuracy:', test_acc)

predictions = model.predict(normalizeFeatures(np.array([[131, 10, 13]])))
ind = np.argmax(predictions[0])
print('Predicted color is: ', labels[ind])

# model_json = model.to_json()
# with open("model.json", "w") as json_file:
#     json_file.write(model_json)
# # serialize weights to HDF5
# model.save_weights("model.h5")
# print("Saved model to disk")

model.save('model.h5')

# tensorflowjs_converter --input_format=keras --output_format=tfjs_layers_nsorflowjs_convemodel .\model.h5 ../my-model