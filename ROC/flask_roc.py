from flask import Flask, request, render_template, Request, jsonify, json, Response
from flask_restful import Resource, Api, reqparse
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.metrics import roc_curve
import pandas as pd
import numpy as np

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # used to make sure JS files update
api = Api(app)

class ROC(Resource):
    def get(self, preprocessing, C):
      # preprocess
      if(preprocessing == 'SS'):
        scaler = StandardScaler()
      if(preprocessing  == 'MM'):
        scaler = MinMaxScaler()
      train = scaler.fit_transform(X_train)
      test = scaler.transform(X_test)

      # fit model
      LR = LogisticRegression(C=float(C))
      LR.fit(train, y_train)

      # predict
      preds = LR.predict(test)

      # calc ROC
      fpr, tpr, thresholds = roc_curve(y_test, preds, pos_label=1)
      roc_result = jsonify([{'tpr':float(tpr[i]), 
                     'fpr': float(fpr[i]), 
                     'threshold': float(thresholds[i])} 
                   for i in range(len(fpr))])
      return roc_result 

api.add_resource(ROC, '/getROC/preprocessing=<preprocessing>/C=<C>')

# add user input to flash, to avoid chrome web security problems
@app.route('/') 
def get_index():
    return render_template('index.html')

if __name__ == '__main__':
    # load data
    df = pd.read_csv('data/transfusion.data')
    df.columns = ['Recency','Frequency','Monetary','Time','Donated']
    xDf = df.loc[:, df.columns != 'Donated']
    y = df['Donated']
    # get random numbers to split into train and test
    np.random.seed(1)
    r = np.random.rand(len(df))
    # split into train test
    X_train = xDf[r < 0.8]
    X_test = xDf[r >= 0.8]
    y_train = y[r < 0.8]
    y_test = y[r >= 0.8]
    app.run(debug=True)
