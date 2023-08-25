import requests
from bs4 import BeautifulSoup
import re

def main():
    r = requests.get('https://nintendo.fandom.com/wiki/Category:Kirby_characters')
    soup = BeautifulSoup(r.content, 'html.parser')
    a_elements = soup.find_all('a', class_='category-page__member-link')
    characters = []
    characters_p = []
    illegal_chars = r'[^a-z ]+'

    def genLists():
        for i in a_elements:
            str = i.text.replace(' ', '')
            if '(' in str:
                characters_p.append(str.upper())
            if len(str) >=4 and len(str) <= 10:
                if not re.search(illegal_chars, str, re.IGNORECASE):
                    characters.append(str.upper())
    genLists()
    
    characters = set(characters)
    for i in characters_p:
        print(i)
    print(list(characters))
#main()

def noDupes():
    arr1 = ['DRAWCIA', 'ZEROTWO', 'KIRBY', 'FLAMER', 'WADDLEDEE', 'SPINNI', 'BUGZZY', 'JUKID', 'RIBBON', 'ELLINE', 'MARA', 'MAIMAIGOON', 'NAGO', 'GOOEY', 'PITCH', 'STORO', 'BEADRIX', 'KNUCKLEJOE', 'GORIMONDO', 'LANDIA', 'LOLA', 'MASTERHAND', 'KINE', 'METAKNIGHT', 'CHILLY', 'ESCARGOON', 'MARX', 'ROCKY', 'SIMIRROR', 'HOTHEAD', 'RICK', 'KABU', 'ICEDRAGON', 'TUFF', 'WADDLEDOO', 'BUTTERFLY', 'LEONGAR', 'GRIZZO', 'SILLYDILLO', 'CAPTAINVUL', 'GREENKIRBY', 'DOMWOOLE', 'ELFILIN', 'DAROACH', 'KINGDEDEDE', 'ADELEINE', 'BOMBAR', 'CLAWROLINE', 'DARKMIND', 'DYNABLADE', 'FECTOFORGO', 'MAGMAN', 'MAGOLOR', 'SQUASHINI', 'BONKERS', 'TARANZA', 'BLOCKY', 'SQUISHY', 'TIFF', 'MOONJA', 'BOXBOXER', 'AXKNIGHT', 'KRACKO', 'PHANPHAN', 'IRONMOM', 'MARXSOUL', 'STARDREAM', 'NECRODEUS', 'KEEBY', 'BRONTOBURT', 'HYNESS', 'SAILORDEE', 'LADYLIKE', 'MACEKNIGHT', 'NAGO', 'CHILLY', 'MOONJA', 'ADELEINE', 'SIMIRROR', 'LANDIA', 'JUKID', 'LOLA', 'KEEBY', 'BEADRIX', 'SILLYDILLO', 'KINE', 'TIFF', 'TUFF', 'MARX', 'ACRO', 'DRAWCIA', 'BLOCKY', 'ROCKY', 'CHUCHU', 'BOMBAR', 'NECRODEUS', 'ESCARGOON', 'ELFILIN', 'SPINNI', 'SQUISHY', 'CLAWROLINE', 'RIBBON', 'SQUASHINI', 'GORIMONDO', 'MAIMAIGOON', 'KABU', 'BUTTERFLY', 'BONKERS', 'TARANZA', 'FLAMER', 'MARA', 'GRIZZO', 'RICK', 'POPOPO', 'NIGHTMARE', 'ZERO', 'HYNESS', 'MAGOLOR', 'MAGMAN', 'LEONGAR', 'BUGZZY', 'STORO', 'GOOEY', 'PITCH', 'DAROACH', 'ELLINE', 'KRACKO', 'KIRBY']
    
    arr2 = [i.upper().strip() for i in arr1]

    arr2 = set(arr2)

    print(f'arr2 = {list(arr2)}')

noDupes()