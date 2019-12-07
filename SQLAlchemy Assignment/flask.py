import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
Base.classes.keys()
# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station
#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
	"""List all available api routes."""
	return (
		f"Available Routes:<br/>"
		f"/api/v1.0/prcp<br/>"
		f"/api/v1.0/stations<br/>"
		f"/api/v1.0/tobs<br/>"
		f"/api/v1.0/start<br/>"
	)


@app.route("/api/v1.0/prcp")
def prcp():
	# Create our session (link) from Python to the DB
	session = Session(engine)
	last_twelve_months = dt.date(2017, 8, 23) - dt.timedelta(days=365)
	last_one_yr = session.query(Measurement.date, Measurement.prcp).filter(last_twelve_months <= Measurement.date).all()

	prcp_date = {date: prcp for date,prcp in last_one_yr}

	session.close()

	return jsonify(prcp_date)


@app.route("/api/v1.0/stations")
def stations(): 
	# Create our session (link) from Python to the DB
	session = Session(engine)
#Return a JSON list of stations from the dataset.
	list_of_stations = session.query(Station.station).all()

	session.close()
	# Convert list of tuples into normal list
	all_stations = list(np.ravel(list_of_stations))
	
	return jsonify(all_stations)


@app.route("/api/v1.0/tobs")
def tobs():
	# Create our session (link) from Python to the DB
	session = Session(engine)
#query for the dates and temperature observations from a year from the last data point.
	#one_year = dt.timedelta(days = 365)

	Temp_observations = session.query(Measurement.tobs, Measurement.date).filter(Measurement.date >= '2016-08-23').\
		filter(Measurement.date <= '2017-08-23').order_by(Measurement.date).all()
		

	list = []
	for i in Temp_observations:
		row = {}
		row["DATE"] = Temp_observations[0]
		row["TOBS"] = Temp_observations[1]
		list.append(row)

	
	session.close()
	return jsonify(list) 


@app.route("/api/v1.0/start")
def start():
	# Create our session (link) from Python to the DB
	session = Session(engine)

	result = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).filter(Measurement.date >= '2016-08-23').\
	filter(Measurement.date <= '2017-08-23').all()
   
	session.close()
	start_temp = list(np.ravel(result))
	return jsonify(start_temp)

if __name__ == '__main__':
	app.run(debug=True)
