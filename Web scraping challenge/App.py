from flask import Flask, render_template, redirect
from flask_pymongo import MongoClient
from rover.scrape_mars_BS import ScrapeSpace
import os

app = Flask(__name__)
client = MongoClient(os.environ['MONGODB_URI'])
db = client['mars']


@app.route('/')
def index():
    try:
        mars = db.mars.find_one()
        return render_template('index.html', mars=mars)
    except:
        redirect("/scrape", code=302)


@app.route('/scrape')
def get():
    mars = db.mars
    scraper = ScrapeSpace(
        url1='https://mars.nasa.gov/news/',
        url2='https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars',
        url3='https://twitter.com/marswxreport?lang=en',
        url4='http://space-facts.com/mars/',
        url5='https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    )
    data = scraper.scrape()
    mars.update({}, data, upsert=True)

    return redirect("/", code=302)


if __name__ == "__main__":
    app.run()