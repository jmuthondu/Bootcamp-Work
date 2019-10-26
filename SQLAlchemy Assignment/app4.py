 
 import numpy as np

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
        
    )


@app.route("/api/v1.0/prcp")
def prcp():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    last_twelve_months = dt.date(2017, 8, 23) - dt.timedelta(days=365)
    last_one_yr = session.query(Measurement.date, Measurement.prcp).filter(last_twelve_months <= Measurement.date).all()
    

    
   
    session.close()

    prcp_date = {date: prcp for date,prcp in last_one_yr}
    
    return jsonify(prcp_date)





if __name__ == '__main__':
    app.run(debug=True)
