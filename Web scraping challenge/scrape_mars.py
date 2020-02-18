import pandas as pd
import requests
from bs4 import BeautifulSoup as bs
import pymongo
from splinter import Browser

#Browser
def init_browser():
    executable_path = {'executable_path': 'C:/Program Files/chromedriver_win32/chromedriver.exe'}
    return Browser('chrome', **executable_path, headless=False)

def scrape():
    browser = init_browser()

    #Mars News
    url = 'https://mars.nasa.gov/news/'
    # Above same as jupyter notebook
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    title = soup.find('div', class_="content_title")
    # title_text = title.a.text
    title = title_text.strip()
    news_p = soup.find("div", class_=("article_teaser_body")
    # news_text = news_p.text
    # news_text = news_text.strip()

    #Featured Photo
    jpl_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(jpl_url)
    html = browser.html
    soup= BeautifulSoup(html, 'html.parser')

    image = soup.find(class_ = 'button fancybox')
    image_url = image['data-fancybox-href']
    featured_image_url= "https://www.jpl.nasa.gov" + image_url

    #Mars Weather
    mars_url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(mars_url)
    html = browser.html
    soup = BeautifulSoup (html, 'html.parser')

    tweets = soup.find(class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text")
    tweets = tweets.text.strip()

    #Mars Facts
    Marsfacts = pd.read_html('https://space-facts.com/mars/')
    Marsfacts_df = facts_table[0]
    Marsfacts_df.columns = ["Description", "Value"]
    Marsfacts_df = Marsfacts_df.set_index("Description", inplace=True)
    facts_html = Marsfacts_df.to_html()

    #Mars Hemispheres
    url__for_all_hemispheres = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url__for_all_hemispheres)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    all_items = soup.find("div", class_ = "result-list")
    hem = all_items.find_all("div", class_ = "item")
#empty list
    hems_url = []
# main_url = "https://astrogeology.usgs.gov"
#loooping through the all_items stored
# try:
for i in hem:
    
    title = i.find('h3').text
    title = title.replace("Enhanced", "")
    image_link = i.find("a")["href"]
        #full image source

    img_url = "https://astrogeology.usgs.gov/" + image_link
    browser.visit(img_url)
    html = browser.html
    soup = BeautifulSoup(html, "html.parser")
    downloads = soup.find("div", class_="downloads")
    url = downloads.find("a")["href"]
    #Creating a dictionary
    dictionary = {"title": title, "img_url": image_url}
    #Appending the empty list to a dictionary
    hems_url.append(dictionary)
    hems_url


    # titles = soup4.find_all("h3")
    #  for title in titles:
    #     browser.click_link_by_partial_text("Hemisphere")

    # results4 = soup4.find_all("div", class_="description")
    # mars_dict={}
    # hemisphere_image_urls=[]
    #  for result in results4:
    #     link = result.find('a')
    #     img_href = link['href']
    #     title_img = link.find('h3').text
    #     url6 = "https://astrogeology.usgs.gov" + img_href
    #     browser.visit(url6)
    #     html5 = browser.html
    #     soup5 = bs(html5, 'html.parser')
    #     pic = soup5.find("a", target="_blank")
    #     pic_href = pic['href']
    #     hemisphere_image_urls.append({"title":title_img,"img_url":pic_href})

    #Dictionary of all Mars Info Scraped
    mars_info_dict = {"news_title":title,"news_text":news_p,"featured_image":featured_image_url,
    "mars_weather":tweets,"facts_table":facts_html,"hemisphere_img":hems_urls}

    browser.quit()

    return mars_info_dict