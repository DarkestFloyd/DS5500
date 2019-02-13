from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

## load data
import pandas as pd
data = pd.read_csv("./seattle-temps.csv")

## create dictionary
data_dict = {}
for idx in range(data.shape[0]):
    t_data = data.iloc[idx, :]
    ### remove / and space for url problems
    data_dict[t_data.date.replace('/', '-').replace(' ', '')] = t_data.temp

class Weather(Resource):
    def get(self, date):
        return {'temp': data_dict[date]}

api.add_resource(Weather, '/<string:date>')

if __name__ == '__main__':
    app.run(debug=True)

# TO TEST: localhost:5000/2010-10-1023:00 gives the temp for 2010/10/10 at 23:00 
