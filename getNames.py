import requests
from bs4 import BeautifulSoup
import re

def main():
    r = requests.get('https://nintendo.fandom.com/wiki/Category:F-Zero_pilots')
    soup = BeautifulSoup(r.content, 'html.parser')
    a_elements = soup.find_all('a', class_='category-page__member-link')
    characters = []
    characters_p = []
    illegal_chars = r'[^a-z]+'

    def genLists():
        for i in a_elements:
            if '(' in i.text:
                characters_p.append(i.text.upper())
            if len(i.text) >=4 and len(i.text) <= 10:
                if not re.search(illegal_chars, i.text, re.IGNORECASE):
                    characters.append(i.text.upper())
    genLists()
    
    characters = set(characters)
    for i in characters_p:
        print(i)
    print(list(characters))
#main()

def noDupes():
    smash_bros_arr1 = ['Bayonetta', 'Bowser', 'Byleth', 'falcon', 'Charizard', 'chrom', 'cloud', 'corrin', 'daisy', 'samus', 'mario', 'falco', 'Ganondorf', 'Greninja', 'hero', 'Incineroar', 'Inkling', 'Isabelle', 'Ivysaur', 'Jigglypuff', 'Joker', 'Kazuya', 'Kirby', 'link', 'Lucario', 'Lucas', 'Lucina', 'Luigi', 'Marth', 'Mewtwo', 'Mythra', 'ness', 'Olimar', 'Palutena', 'Peach', 'Pichu', 'Pikachu', 'Pyra', 'Richter', 'Ridley', 'Robin', 'Rosalina', 'Sephiroth', 'sheik', 'Shulk', 'Simon', 'Snake', 'Sonic', 'Sora', 'Squirtle', 'Steve', 'Terry', 'Villager', 'Wario', 'Wolf', 'Yoshi', 'zelda']
    
    smash_bros_arr = [i.upper().strip() for i in smash_bros_arr1]

    smash_bros_arr = set(smash_bros_arr)

    print(f'smash_bros_arr = {list(smash_bros_arr)}')

noDupes()