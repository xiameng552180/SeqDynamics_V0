from selenium import webdriver
import os
import sys

def scrape(f, difficulty, problems):
    url = "http://luckycat.kshs.kh.edu.tw/"
    driver.get(url)
    selection = driver.find_element_by_css_selector("input[value='" + str(difficulty) + "']")
    selection.click()
    search = driver.find_element_by_css_selector("input[value=' Go! ']")
    search.click()
    titles = driver.find_elements_by_xpath("//tr/td/a")
    for title in titles:
        if title.text in problems:
            row = title.find_element_by_xpath("../..")
            type = row.find_elements_by_css_selector("td")[4].text
            if (type == None or type == ""):
                f.write('{"problem_name":"' + title.text + '","difficulty":"' + str(difficulty - 990) + '","type":""}\n')
            else:
                f.write('{"problem_name":"' + title.text + '","difficulty":"' + str(difficulty - 990) + '","type":"' + type + '"}\n')

try:
    reload(sys)
    sys.setdefaultencoding('utf-8')
    f = open("problems-adv2017.json", "w+")
    with open("match.list", "r") as lines:
        problems = []
        for line in lines:
            problems.append(line[:-1])
    print(problems)
    lines.close()
    driver = webdriver.Chrome()
    driver.maximize_window()
    difficulty = 991
    while difficulty < 995:
        scrape(f, difficulty, problems)
        difficulty = difficulty + 1
    f.close()

except Exception as e:
    print(e)
