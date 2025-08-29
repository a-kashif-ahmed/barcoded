import requests
import re
from bs4 import BeautifulSoup

def scrape_google(bar):
    
    try:
        with open('pricetext.txt','r',encoding='utf-8') as p :
            file = p.read()
            ser = rf"'{bar}'\s*:\s*'([\d.]+)'"
            founded = re.search(ser,file)
            if founded:
                print(founded.group(1))
                return founded.group(1)
        
        p.close()
    finally:
        print("Heh")
    print('Starting')
    url = f"https://kiranamarket.com/?s={bar}&post_type=product&type_aws=true"
    
    response = requests.get(url)
    
    if response.status_code != 200:
        print("Failed to fetch page:", response.status_code)
        return []
    
    soup = BeautifulSoup(response.text, "html.parser")
    with open('htmltext.txt', 'w', encoding='utf-8') as f:
        f.write(response.text)
    
    
    pattern = r"Current price is:\s*&#8377;([\d.,]+)"  # Fixed typo: patten -> pattern
    prices = re.search(pattern, response.text)
    
    costs = []
    if prices:
        currentp = prices.group(1)
        try:
            with open('pricetext.txt', 'r', encoding='utf-8') as p:
                content = p.read()
                if f"'{bar}'" in content:
                    # Barcode exists, check if same price
                    if f"'{bar}' : '{currentp}'" in content:
                        print("Same barcode and price, skipping.")
                        
                    else:
                        print(f"Barcode exists but price different. Updating to {currentp}")
        except FileNotFoundError:
            print("New file, adding first entry")
        finally:
            p.close()
        costs.append(prices.group(1))
        with open('pricetext.txt','a',encoding='utf-8') as p:
            p.write(f"\n '{bar}' : '{prices.group(1)}'")
        
    
    
if __name__ == "__main__":
    data = scrape_google()
    