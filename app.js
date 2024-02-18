const c = (x) => {return console.log(x)} //For more convenient testing 
let answer;
let answers_obj;
const url = window.location.href.split('?'); //Splits url by query, if there is one

//Tells user which franchise the answer comes from
const showFranchise = (key) => {
    $('#answer_franchise').text('');
    $('#answer_franchise').append(`<u>${key}</u>`);
    //Changes ID since this element shouldn't be clicked again
    $('#answer_franchise').attr('id', 'answer_franchise_no_hover');
    $('#answer_franchise').removeAttr('id');
}

//Generates a sharable link with the current game state's answer, and the answer's franchise
const genLink = (key, answer) => {
    const baseURL = window.location.href.split('?')[0]; //Variable holds base url
    const b64Answer = btoa(`${key},${answer}`) //Encoded answer in B64
    const URIanswer = encodeURIComponent(b64Answer); //Encoded B64 for URL
    let url = `${baseURL}?a=${URIanswer}`; //Sets answer as query param
    $('#custom_link').text(url);
}

function genAnswer() {
    answers_obj = {
        'The Legend of Zelda' : ['OLIVIO', 'ROCKLIKE', 'MAKUTREE', 'YONA', 'GOLO', 'GHIRAHIM', 'PONNICK', 'MALLARA', 'RIJU', 'YUNOBO', 'HOSKIT', 'HINOX', 'BUCHA', 'LEVIAS', 'MAGGIE', 'MIDO', 'MASTRO', 'DEKUBUTLER', 'ORCA', 'KNUCKLE', 'SENZA', 'JAMBO', 'CYCLOS', 'ZELDA', 'REVALI', 'HENYA', 'DEADHAND', 'DEKUKING', 'TETRA', 'AMALI', 'ROSE', 'VALOO', 'MIPHA', 'JELLYF', 'LOPSA', 'TOBY', 'OOCCOO', 'BARKLE', 'ANTON', 'KINGGLEEOK', 'LINDA', 'BOKOBLIN', 'ANKLE', 'STONETALUS', 'OAKIN', 'FLESI', 'BLOSSOM', 'KOLTIN', 'DEKULINK', 'FYER', 'COBAL', 'BARNES', 'HUCK', 'GONZO', 'STALKOBLIN', 'ASHEI', 'GREBA', 'CAWLIN', 'MINERU', 'TULIN', 'RUPIN', 'COLGERA', 'LEDD', 'GULLEY', 'DEMISE', 'GARRICKSON', 'NAYRU', 'DAMPA', 'MALANYA', 'STALMOBLIN', 'AEROCUDA', 'ICELIKE', 'ASTOR', 'ERROR', 'WILLI', 'ZILL', 'MALLADUS', 'GIBDO', 'KINGRHOAM', 'KINGRAURU', 'WORTSWORTH', 'MOOSH', 'GADDISON', 'BORVILLE', 'EVERMEAN', 'ONOX', 'MERCO', 'ALDO', 'CIELA', 'SPARROT', 'MAKAR', 'KIIMO', 'FROX', 'KOSI', 'DEKUSCRUB', 'GANON', 'LOOT', 'MUTOH', 'FARON', 'GOSSACK', 'GOSELLE', 'MALON', 'ANGLERFISH', 'DARUNIA', 'KAMO', 'KORTZ', 'PLATS', 'LANAYRU', 'CADO', 'DARKLINK', 'NUDGE', 'JOSHA', 'KASS', 'BIGGORON', 'KARANE', 'TEBA', 'MEDIGORON', 'LARUTO', 'ORDONA', 'SIDON', 'DARKNUT', 'PIPIT', 'GULD', 'GULLY', 'MISKO', 'BIPIN', 'PARELLA', 'RUSTA', 'SHOCKLIKE', 'KAPSON', 'MOLDUKING', 'PIPER', 'TOTT', 'MISSY', 'ORIELLE', 'IMPA', 'CHUCHU', 'OOLO', 'OLIFF', 'HORWELL', 'STURGEON', 'HYLIA', 'MOBLIN', 'OCTOROK', 'JOANNA', 'BURMANO', 'KILTON', 'AGITHA', 'DINOLFOS', 'DARBUS', 'LYNEL', 'OLDMAN', 'PARROW', 'DARMANI', 'BATREAUX', 'KOMALI', 'GROOSE', 'JOEL', 'PEATER', 'KARSH', 'DAMPE', 'PIGS', 'ANJU', 'DANGORO', 'COPPORA', 'GOREBIZO', 'SILVA', 'FISHMEN', 'MACHI', 'EPONA', 'PEATRICE', 'KOTAKE', 'ZEPHOS', 'DIN', 'KEET', 'STRICH', 'NABOORU', 'BERTIE', 'PAYA', 'LINDER', 'MIKAU', 'FROSTTALUS', 'MINENCO', 'GORCORON', 'ELMA', 'GORIYA', 'GAEPORA', 'BLIZZROBE', 'CANDY', 'MAMAMUYAN', 'EMBER', 'PUMM', 'OCTAVO', 'MORAGIA', 'WRYNA', 'ZANC', 'ODOLWA', 'INGO', 'AVEIL', 'NACKLE', 'ZUKO', 'MAPLE', 'DEATHSWORD', 'KREEB', 'HORRIBLIN', 'PENN', 'IRENE', 'JABUN', 'ROBBIE', 'JANKA', 'MIDNA', 'URBOSA', 'QUILL', 'CARPENTERS', 'KUKIEL', 'ANSON', 'FLEDGE', 'SONIA', 'GROG', 'AURU', 'DRONA', 'BEANSELLER', 'NIKO', 'LINEBECK', 'GORTRAM', 'KANE', 'GILLIAN', 'BAITO', 'BULIARA', 'ADDISON', 'BELLUM', 'LANA', 'TWINROVA', 'ELDIN', 'GONDO', 'SALVATORE', 'STALNOX', 'GLEEOK', 'MALO', 'RAURU', 'KEESE', 'HOLLO', 'GONGORON', 'GREATFAIRY', 'DARUK', 'CARLOV', 'MOON', 'TYTO', 'GANONDORF', 'POTOVA', 'KOUME', 'DORIAN', 'KOGOLI', 'FARORE', 'COLIN', 'MESA', 'FIRELIKE', 'ERLA', 'PHOENI', 'MOLDUGA', 'ROWN', 'MARIN', 'KINA', 'IRCH', 'LADYMAUD', 'OWLAN', 'OBLI', 'CROO', 'BIGOCTO', 'TUBERT', 'HARTH', 'IGNEOTALUS', 'BYRNE', 'AGAHNIM', 'KOBOLI', 'LEOP', 'KONORA', 'OFFRAK', 'MANNY', 'EZLO', 'ARYLL', 'GUMMY', 'IVEE', 'CAROCK', 'TINGLE', 'PASHLI', 'FYSON', 'MEDLI', 'BEEDLE', 'BLUEHINOX', 'HESTU', 'GORKO', 'FAIRY', 'EAGUS', 'DOVOS', 'NAMALI', 'CRAZYTRACY', 'DEON', 'JAKAMAR', 'GREYSON', 'PURAH', 'MILA', 'MISA', 'NAPPIN', 'KAFEI', 'YERBAL', 'GRAMPS', 'ADULTLINK', 'BASHT', 'KINGDALTUS', 'ILIA', 'BAZZ', 'TAURO', 'LIKELIKE', 'ILARI', 'LINKLE', 'BRONZI', 'KINGGUSTAF', 'DODOH', 'FADO', 'HUDSON', 'MUCKTOROK', 'FOURGIANTS', 'BLACKHINOX', 'NAVI', 'HORG', 'LIZALFOS', 'MAKO', 'LINK', 'ALFONZO', 'MEESHY', 'DIMITRI'],
        'Animal Crossing' : ['CARROT', 'BIFF', 'EUGENE', 'ANNALISA', 'CHESTER', 'BANGLE', 'BEARDO', 'CUPCAKE', 'BONBON', 'CHRISSY', 'BOOMER', 'DOTTY', 'CASHMERE', 'BEAU', 'APOLLO', 'DRAKE', 'CAROLINE', 'BITTY', 'BUBBLES', 'CHERRY', 'DIGBY', 'APPLE', 'CHUCK', 'CHELSEA', 'ANICOTTI', 'CHIEF', 'COBB', 'AXEL', 'ANALOGUE', 'CEPHALOBOT', 'BRUCE', 'ELISE', 'AZALEA', 'COOKIE', 'CARLO', 'COPPER', 'CHADDER', 'CHERI', 'BESSIE', 'DOBIE', 'CHARLISE', 'DAISY', 'CLAUDIA', 'DORA', 'AGNES', 'BROFFINA', 'ELMER', 'ANTONIO', 'COLE', 'BLANCA', 'CHOPS', 'BENJAMIN', 'EPONA', 'AUDIE', 'COLTON', 'CYRUS', 'ELVIS', 'ALLI', 'ELOISE', 'FAUNA', 'CELIA', 'BLATHERS', 'AMELIA', 'CANBERRA', 'DIZZY', 'BREE', 'DIANA', 'EUNICE', 'BISKIT', 'DIVA', 'FANG', 'CHAMP', 'AZIZ', 'AVERY', 'ANABELLE', 'BUNNIE', 'CHABWICK', 'CLAUDE', 'EMERALD', 'CURLOS', 'CUBE', 'BELLE', 'ANNALISE', 'ELLIE', 'BELLA', 'BOONE', 'BREWSTER', 'DRAGO', 'CHICO', 'ASTRID', 'ALICE', 'CLERK', 'BROCCOLO', 'DELI', 'CLAY', 'DOZER', 'CARMEN', 'BECKY', 'BLAIRE', 'EMCEE', 'CURT', 'CLARA', 'ANKHA', 'BETTY', 'BUZZ', 'BEPPE', 'BAROLD', 'DERWIN', 'BLUEBEAR', 'CANDI', 'CURLY', 'CECE', 'BILLY', 'BONES', 'CROQUE', 'BENEDICT', 'CHEVRE', 'CAMOFROG', 'BUTCH', 'CHAI', 'CRANSTON', 'BOOKER', 'BERTHA', 'FAITH', 'CYRANO', 'DEIRDRE', 'CLEO', 'DEENA', 'CELESTE', 'DRIFT', 'CHOW', 'BIANCA', 'ERIK', 'BOOTS', 'BAABARA', 'CORNIMER', 'AURORA', 'BUCK', 'COACH', 'ANGUS', 'ALFONSO', 'FARLEY', 'BOYD', 'BETTINA', 'COCO', 'ANCHOVY', 'BORIS', 'CALLY', 'BLANCHE', 'AISLE', 'CHIP', 'BILL', 'COUSTEAU', 'EGBERT', 'CESAR', 'CLYDE', 'ADMIRAL', 'CARRIE', 'ELINA'],
        'Mario' : ['HIYOIHOI', 'POKEY', 'LUIGI', 'FIGHTERFLY', 'BANDIT', 'BEEZO', 'SNIFITS', 'FLEEP', 'CATMARIO', 'BIGTOP', 'GEARMO', 'BOGMIRE', 'KINGBOO', 'EYEROK', 'MECHAKOOPA', 'NABBIT', 'GRINDER', 'BLUETOAD', 'ROSALINA', 'BATADON', 'FLUDD', 'KAMEK', 'FLURRY', 'CURT', 'GLOOMBA', 'DARKBOWSER', 'BONETAIL', 'FURYBOWSER', 'FAWFUL', 'BOWSER', 'THWOMP', 'DAPHNE', 'BAHAMUT', 'DODO', 'GOOMBRAT', 'SHYGUY', 'CHUBOOMBA', 'GRRROL', 'BLARGG', 'GENERALGUY', 'CZARDRAGON', 'DOOPLISS', 'BRIAN', 'BOOKEND', 'GOOMBA', 'EDGE', 'LUMAS', 'BOOMER', 'ALBINODINO', 'YOSHI', 'BESTOVIUS', 'GNARANTULA', 'FLUZZARD', 'NOKIS', 'CHAD', 'BOOSTER', 'WALUIGI', 'BRIGHTON', 'BRISTLE', 'CLAY', 'BABYDAISY', 'BROODALS', 'CATPEACH', 'ELROY', 'HAMMERBRO', 'CHIKAKO', 'BOOTLER', 'GOOMBEETLE', 'CHETRIPPO', 'BIRDO', 'RANGO', 'FREEZIE', 'DIDDYKONG', 'CROCO', 'BELOME', 'AMANITA', 'CHAS', 'GUMMIT', 'WARIO', 'CLAWGRIP', 'ARANTULA', 'FLIT', 'WHOMPS', 'BANDYANDY', 'DASHELL', 'KOOPA', 'CLUBBA', 'TOAD', 'BLOOEY', 'BARB', 'BORP', 'CATAQUACK', 'BOMBETTE', 'WART', 'BONECHILL', 'CHUCKYA', 'BLITTY', 'TIARA', 'GOOMBAS', 'BURNER', 'ELVINGADD', 'BARRY', 'GALOOMBA', 'GREENIES', 'COURSEBOT', 'DUPLIGHOST', 'DRAGGADON', 'SPIKETOP', 'CLEFT', 'ANKOOPA', 'SPIKE', 'BOBOMB', 'ALLIE', 'BLOOPER', 'WIGGLER', 'BOBBY', 'MONTYMOLE', 'HANDFAKE', 'DIMENTIO', 'AXEMRED', 'TOADETTE', 'FRANCIS', 'FLIFIT', 'BOOLOSSUS', 'DONPIANTA', 'BESSIEBASS', 'CROWBER', 'DIXIEKONG', 'GENEYUSS', 'DORRIE', 'CAPPY', 'NINJIS', 'DAISY', 'BULLETBILL', 'SPINY', 'AZALEA', 'BOWYER', 'ALEX', 'FAKEBOWSER', 'EXOR', 'AUTOBOMB', 'DRYBOWSER', 'BOBOMBS', 'BABYPEACH', 'CHAUNCEY', 'COCONUTTER', 'JELLYBEAM', 'KLEPTO', 'BUMPTY', 'BIDDYBUD', 'CHRIS', 'CUDGE', 'BOSHI', 'BIGBOO', 'PAULINE', 'BROGGY', 'EMILY', 'BIFFATLAS', 'GUERILLA', 'FUZZY', 'DWEEZIL', 'BOMP', 'CHAN', 'BETH', 'MAGIKOOPA', 'ARFUR', 'BIGGERBOO', 'CLEFTOR', 'CARRIE', 'BOWSERJR', 'FLOMP', 'JUNKER', 'LAKITU', 'GIRA', 'BELDAM', 'HOTHEAD', 'HIDERS', 'CHAKRON', 'GUSHEN', 'JABBI', 'DOTTIE', 'DOLPHIN', 'BABYWARIO', 'CHAINCHOMP', 'BABYMARIO', 'FLAPTACK', 'AIRNAPSE', 'ELMO', 'GRINGILL', 'BANKTOAD', 'BABYBOWSER', 'GARY', 'FROSTY', 'ELLA', 'DEBULL', 'PIANTAS', 'CORTEZ', 'BARONBRRR', 'ELDEN', 'BUZZ', 'BOOMBOOM', 'BROOZER', 'POOCHY', 'DRYBONES', 'METALMARIO', 'GOLDMARIO', 'WHOMP', 'BABYLUIGI', 'CATTOAD', 'DIGGA', 'FRYGUY', 'CACKLETTA', 'FLURRIE', 'MARIO', 'BLUEGOOMBA', 'BIGMASSIF', 'CHEEPCHEEP', 'ANUBOO', 'BABYYOSHI', 'ELDSTAR', 'BULLY', 'PODOBOO', 'DRMARIO'],
        'Pokémon' : ['STARMIE', 'GIBLE', 'DRAMPA', 'BRELOOM', 'CLEFABLE', 'FRAXURE', 'MARACTUS', 'PELIPPER', 'TORRACAT', 'ETHAN', 'REGIROCK', 'ELEKID', 'TORNADUS', 'GOLETT', 'RILLABOOM', 'CRAWDAUNT', 'KROKOROK', 'STARYU', 'PYUKUMUKU', 'STARAVIA', 'HAPPINY', 'CYLLENE', 'GLORIA', 'FALKNER', 'SWAMPERT', 'CANDELA', 'CLOVER', 'GLACEON', 'ARCTIBAX', 'BUCK', 'NOIVERN', 'CRAWFORD', 'TOEDSCRUEL', 'OINKOLOGNE', 'MOLTRES', 'ISAAC', 'APPLETUN', 'ARTICUNO', 'CANDICE', 'AGATHA', 'WATTREL', 'EKANS', 'CHUCK', 'BURGH', 'AKARI', 'LUMINEON', 'JUMPLUFF', 'BILLY', 'DRIZZILE', 'ANTHE', 'BYRON', 'ZANGOOSE', 'TADBULB', 'CHIMCHAR', 'SNIVY', 'OMASTAR', 'MONFERNO', 'FEAROW', 'PUPITAR', 'ONIX', 'GARCHOMP', 'PROBOPASS', 'MORGREM', 'COMBUSKEN', 'GROCK', 'ARBOK', 'MEOWTH', 'NIHILEGO', 'DRIFBLIM', 'SPECTRIER', 'CLEFAIRY', 'REGICE', 'BURMY', 'JOLTIK', 'AZURILL', 'TYRUNT', 'GURDURR', 'SANDILE', 'NAGANADEL', 'WOBBUFFET', 'CRYOGONAL', 'CHILI', 'INGO', 'CLYDE', 'FLINT', 'SWIRLIX', 'ZIGZAGOON', 'CROBAT', 'DRAKLOAK', 'MUNNA', 'NUMEL', 'DEINO', 'CHESPIN', 'AMARYS', 'DECIDUEYE', 'FARIGIRAF', 'ROTOM', 'VELUZA', 'CHEWTLE', 'GLIMMORA', 'WATCHOG', 'SLUGMA', 'TURTONATOR', 'ROLYCOLY', 'GRUSHA', 'GOLDUCK', 'BLAZIKEN', 'WISHIWASHI', 'VICTREEBEL', 'SKARMORY', 'ESCAVALIER', 'RABSCA', 'SHUPPET', 'KECLEON', 'AZELF', 'BLASTOISE', 'ERMA', 'RHYDON', 'SHELLOS', 'HELIOLISK', 'INCINEROAR', 'DELIBIRD', 'RAIKOU', 'PANSEAR', 'TOXAPEX', 'ELECTRODE', 'COSMOEM', 'GRANT', 'DONPHAN', 'CHARIZARD', 'ATTICUS', 'COPPERAJAH', 'HOUNDOUR', 'ARVEN', 'BULBASAUR', 'IONO', 'DELPHOX', 'MELMETAL', 'VULPIX', 'GORIGAN', 'NUZLEAF', 'SAWSBUCK', 'POLITOED', 'PURUGLY', 'SCRAFTY', 'TINKATON', 'TYROGUE', 'FORRETRESS', 'KOMALA', 'HYPNO', 'BOUFFALANT', 'MANECTRIC', 'BERGMITE', 'TIMBURR', 'GROUDON', 'SWABLU', 'INKAY', 'DAWN', 'HILDA', 'HITMONCHAN', 'GRETA', 'CHANSEY', 'GLOOM', 'CYNTHIA', 'HOUNDSTONE', 'ALLISTER', 'FLORAGATO', 'TOXEL', 'SPIRITOMB', 'BRUXISH', 'EXCADRILL', 'FURFROU', 'GOTHITA', 'LOUDRED', 'SHROODLE', 'LUCARIO', 'SPHEAL', 'KABUTO', 'DOUBLADE', 'DENDRA', 'BIBAREL', 'SLURPUFF', 'CRUSTLE', 'FABA', 'URSHIFU', 'DRACOVISH', 'GIACOMO', 'TOTODILE', 'PARAS', 'LUXRAY', 'DAHLIA', 'SKIPLOOM', 'REGIELEKI', 'BLUE', 'INFERNAPE', 'CYCLIZAR', 'CLAVELL', 'SCORBUNNY', 'QUAXLY', 'DONDOZO', 'TURTWIG', 'SCYTHER', 'DRAKE', 'HEATMOR', 'WEEZING', 'VIRIZION', 'SPEWPA', 'TOEDSCOOL', 'GOTHORITA', 'ARCANINE', 'GOURGEIST', 'WIGGLYTUFF', 'REGIGIGAS', 'EELEKTROSS', 'BRAIXEN', 'RAMPARDOS', 'LOPUNNY', 'ACCELGOR', 'ZARUDE', 'POIPOLE', 'JELLICENT', 'WHIRLIPEDE', 'NINCADA', 'SHEDINJA', 'HAWLUCHA', 'HAPU', 'SLOWBRO', 'PIDGEOTTO', 'RIOLU', 'EEVEE', 'ARCTOZOLT', 'AMETHIO', 'FALINKS', 'YANMA', 'KAKUNA', 'CROCALOR', 'FROGADIER', 'FROAKIE', 'CELEBI', 'FENNEKIN', 'DRAGALGE', 'SWANNA', 'CLODSIRE', 'MAGCARGO', 'DOLLIV', 'SALAZZLE', 'KLAWF', 'FRILLISH', 'MILCERY', 'MANTINE', 'FERROSEED', 'LITWICK', 'VOLCARONA', 'FLETCHLING', 'DRAGONITE', 'GORDOR', 'MAGMORTAR', 'GARBODOR', 'TINKATUFF', 'SHROOMISH', 'CHERRIM', 'NINJASK', 'PIDGEOT', 'VOLTORB', 'CARBINK', 'SILICOBRA', 'BELLIBOLT', 'CHASE', 'POLIWHIRL', 'ALDER', 'TYMPOLE', 'SWOOBAT', 'ALTARIA', 'THWACKEY', 'TEPIG', 'NIDOKING', 'KUBFU', 'TOGEPI', 'VAROOM', 'AVALUGG', 'PANGORO', 'CHARMANDER', 'SMEARGLE', 'CARKOL', 'COBALION', 'SLOWPOKE', 'LOMBRE', 'DARMANITAN', 'BARBOACH', 'MEGANIUM', 'CAMERUPT', 'PIPLUP', 'MINIOR', 'MEOWSTIC', 'HOOPA', 'TANGELA', 'GROTLE', 'ARCHEOPS', 'TALONFLAME', 'KINGLER', 'BELLOSSOM', 'DUSTY', 'HIPPOPOTAS', 'WOOLOO', 'QUILAVA', 'ODDISH', 'GENESECT', 'EXOL', 'PILOSWINE', 'ALOMOMOLA', 'EMBOAR', 'YVELTAL', 'AERODACTYL', 'SLAKING', 'GAERIC', 'LUNALA', 'CONCORDIA', 'EXPLOUD', 'SOLGALEO', 'BANETTE', 'CALABA', 'EDWARD', 'KANGASKHAN', 'KARRABLAST', 'WUGTRIO', 'SHARPEDO', 'CLAIR', 'PIKACHU', 'ANORITH', 'ELESA', 'LUVDISC', 'BEAUTIFLY', 'SKORUPI', 'LILLIPUP', 'SLIGGOO', 'VIBRAVA', 'SIMISEAR', 'TRAPINCH', 'GUZZLORD', 'ZAMAZENTA', 'SPEAROW', 'MIGHTYENA', 'NATU', 'SEADRA', 'INDEEDEE', 'TAROUNTULA', 'GIGALITH', 'VILEPLUME', 'JUAN', 'GRIMER', 'LURANTIS', 'BRENDAN', 'EMMET', 'SIMISAGE', 'GRUMPIG', 'NYMBLE', 'GROWLITHE', 'CLOYSTER', 'SWALOT', 'MACHOKE', 'TINKATINK', 'MASQUERAIN', 'UNFEZANT', 'GRENINJA', 'EMMA', 'ROSELIA', 'BLITZLE', 'TROPIUS', 'GALVANTULA', 'SMOOCHUM', 'HAUNTER', 'MAWILE', 'SCATTERBUG', 'SPINDA', 'VAPOREON', 'ROOKIDEE', 'GLIMMET', 'MAGMAR', 'CLIFF', 'DITTO', 'COFAGRIGUS', 'HIPPOWDON', 'ZACIAN', 'GABITE', 'SKWOVET', 'BRASSIUS', 'QUAQUAVAL', 'AMELIA', 'PANCHAM', 'JIRACHI', 'MUSHARNA', 'RAICHU', 'CHESNAUGHT', 'BUNNELBY', 'MUDKIP', 'GINTER', 'RHYPERIOR', 'SHIINOTIC', 'LARVESTA', 'YAMASK', 'DUSTOX', 'CACNEA', 'MACHAMP', 'BUZZ', 'AARON', 'KYUREM', 'MARSHADOW', 'ARIADOS', 'MELTAN', 'WARTORTLE', 'GRAVELER', 'VESPIQUEN', 'QUAXWELL', 'TRANQUILL', 'CILAN', 'CINDERACE', 'SUICUNE', 'GOODRA', 'GRIMSLEY', 'PLUSLE', 'BAGON', 'SEEDOT', 'MABOSSTIFF', 'STOUTLAND', 'KLINK', 'ZEKROM', 'JOLTEON', 'LICKILICKY', 'LUGIA', 'DRIFLOON', 'SABLEYE', 'EVELYN', 'KADABRA', 'CHIMECHO', 'AQUARELLA', 'SALANDIT', 'DREEPY', 'JASMINE', 'UMBREON', 'ZERAORA', 'DRACOZOLT', 'LECHONK', 'ELDEGOSS', 'BEDE', 'CHINGLING', 'KLEFKI', 'GHETSIS', 'STEENEE', 'CINCCINO', 'CRANIDOS', 'CYRANO', 'WHIMSICOTT', 'BRAVIARY', 'MAROWAK', 'MARILL', 'GLIGAR', 'VOLBEAT', 'BISHARP', 'HARIYAMA', 'LINOONE', 'SMOLIV', 'NICKIT', 'WIMPOD', 'DUSCLOPS', 'SPINARAK', 'PAWNIARD', 'BEWEAR', 'ORANGURU', 'MANDIBUZZ', 'DEWOTT', 'COGITA', 'NIDORINO', 'DIANTHA', 'YAMPER', 'WORMADAM', 'SHINX', 'SOLROCK', 'BOUNSWEET', 'SEISMITOAD', 'ISCAN', 'SHAYMIN', 'PIKIPEK', 'SOLOSIS', 'SAWK', 'DANA', 'ELIO', 'GYARADOS', 'PANSAGE', 'ANTHEA', 'MAGNEZONE', 'XATU', 'AXEW', 'BONSLY', 'GALLADE', 'BENI', 'THIEVUL', 'GRANBULL', 'TORKOAL', 'AZUMARILL', 'MUDBRAY', 'FERALIGATR', 'BUTTERFREE', 'BEEDRILL', 'RAPIDASH', 'BENGA', 'KLINKLANG', 'ZAPDOS', 'METANG', 'HOUNDOOM', 'BROCK', 'TRUBBISH', 'MAGIKARP', 'GORDIE', 'LOKIX', 'AMAURA', 'JIGGLYPUFF', 'RATICATE', 'DARACH', 'WOOBAT', 'MAMOSWINE', 'POPPLIO', 'ENTEI', 'EUSINE', 'ACEROLA', 'APPLIN', 'BELLSPROUT', 'AROMATISSE', 'HORSEA', 'OVERQWIL', 'FERROTHORN', 'CROCONAW', 'HILBERT', 'FROSMOTH', 'ORTHWORM', 'GIRATINA', 'SNEASLER', 'AVERY', 'OSHAWOTT', 'DRAGAPULT', 'NINETALES', 'MAUSHOLD', 'FENNEL', 'CALEM', 'MILTANK', 'TAILLOW', 'ALCREMIE', 'WAILMER', 'DEWPIDER', 'IVYSAUR', 'FEEBAS', 'SERVINE', 'LYCANROC', 'URSALUNA', 'ILIMA', 'KRICKETUNE', 'SYLVEON', 'FLAMIGO', 'CETODDLE', 'ELECTABUZZ', 'LILEEP', 'PETILIL', 'PINSIR', 'SNUBBULL', 'TSAREENA', 'ARMAROUGE', 'GOSSIFLEUR', 'RAYQUAZA', 'FURRET', 'JOEL', 'BLIPBUG', 'WYNAUT', 'COALOSSAL', 'GOOMY', 'CYNDAQUIL', 'MAGNETON', 'PYROAR', 'STARAPTOR', 'SILVALLY', 'REGISTEEL', 'HELIOPTILE', 'LICKITUNG', 'ELAINE', 'CYRUS', 'KYOGRE', 'GRAPPLOCT', 'LILLIGANT', 'BETTIE', 'BIDOOF', 'MINUN', 'STUNFISK', 'ZUBAT', 'KROOKODILE', 'DHELMISE', 'RATTATA', 'LARVITAR', 'PASSIMIAN', 'ORBEETLE', 'CHANDELURE', 'PSYDUCK', 'CHATOT', 'CETITAN', 'GREAVARD', 'PACHIRISU', 'SNORUNT', 'BRIONNE', 'NIDORINA', 'WHISMUR', 'GLACIA', 'CHARM', 'WOOPER', 'PAWMO', 'FANTINA', 'TRUMBEAK', 'COLRESS', 'BRYCEN', 'GLADION', 'CAITLIN', 'PRINPLUP', 'COTTONEE', 'BEARTIC', 'DUSKNOIR', 'QUAGSIRE', 'SENTRET', 'EELEKTRIK', 'STARLY', 'PALKIA', 'SUNFLORA', 'AMBIPOM', 'ARAQUANID', 'MAKUHITA', 'SPOINK', 'LITTEN', 'AIPOM', 'WHISCASH', 'PHIONE', 'BUIZEL', 'ROCKRUFF', 'CACTURNE', 'FOMANTIS', 'MAREEP', 'VICTINI', 'CALYREX', 'ARGENTA', 'AMPHAROS', 'DREDNAW', 'CHOY', 'IRIDA', 'LEAFEON', 'PALPITOAD', 'MIRAIDON', 'LEDYBA', 'SNOVER', 'HATENNA', 'DEERLING', 'HALA', 'ETERNATUS', 'VOLCANION', 'DRASNA', 'LUXIO', 'BUDEW', 'HATTERENE', 'DROWZEE', 'MORELULL', 'HEATH', 'PORYGON', 'DRILBUR', 'ARDOS', 'STANTLER', 'CHOBIN', 'ERBIE', 'HUNTAIL', 'ARROKUDA', 'NOCTOWL', 'ABRA', 'HERACROSS', 'HAXORUS', 'CARNIVINE', 'CUFANT', 'GLALIE', 'WEEDLE', 'MANKEY', 'ARBOLIVA', 'MACHOP', 'CHARCADET', 'TOXTRICITY', 'SINISTEA', 'DEWGONG', 'IMPIDIMP', 'GIRAFARIG', 'MAREANIE', 'HOPPIP', 'PAWMI', 'GOREBYSS', 'TANGROWTH', 'MORPEKO', 'HERDIER', 'SPRIGATITO', 'REMORAID', 'SAMUROTT', 'GUZMA', 'RABOOT', 'AEGISLASH', 'MEDICHAM', 'GIOVANNI', 'CLEMONT', 'ZORUA', 'MUDSDALE', 'ESPURR', 'TENTACRUEL', 'KLEAVOR', 'TYRANITAR', 'BINACLE', 'GREEN', 'COIN', 'PICHU', 'MILOTIC', 'BRANDON', 'INTELEON', 'WAILORD', 'REVAVROOM', 'DUCKLETT', 'FLYGON', 'SIZZLIPEDE', 'SPIDOPS', 'QUILLADIN', 'CUBCHOO', 'SLAKOTH', 'ARLEY', 'LIEPARD', 'ZYGARDE', 'CAPSAKID', 'EXEGGUTOR', 'SUDOWOODO', 'SKELEDIRGE', 'LUNATONE', 'BRAMBLIN', 'HYDREIGON', 'MOTHIM', 'ANNIHILAPE', 'TOGEDEMARU', 'CASCOON', 'EISCUE', 'MASCHIFF', 'ELDES', 'BRIAR', 'RUFFLET', 'JANINE', 'KINGDRA', 'RELLOR', 'ARLO', 'ARIANA', 'SWINUB', 'GLAMEOW', 'SNORLAX', 'LEAVANNY', 'GOGOAT', 'WEEPINBELL', 'MISMAGIUS', 'SEWADDLE', 'MISDREAVUS', 'FLITTLE', 'VANILLITE', 'JACQ', 'CRESS', 'GLISCOR', 'CROAGUNK', 'BLANCHE', 'PARASECT', 'SKITTY', 'SUNKERN', 'SERPERIOR', 'UNOWN', 'SHELLDER', 'CASTFORM', 'FLORGES', 'SHUCKLE', 'LEDIAN', 'ROSERADE', 'ARCHEN', 'ARMALDO', 'TORCHIC', 'FLOATZEL', 'OBSTAGOON', 'BOOLUM', 'MAGNEMITE', 'ALAKAZAM', 'CORPHISH', 'CLAMPERL', 'SANDACONDA', 'METAPOD', 'TOGETIC', 'CUBONE', 'CONKELDURR', 'LAMPENT', 'SEAKING', 'CAMERON', 'KLANG', 'MALAMAR', 'VULLABY', 'CHLOE', 'SCEPTILE', 'CHARJABUG', 'ARCHER', 'ELITA', 'TANDEMAUS', 'PINECO', 'MESPRIT', 'TOGEKISS', 'PANPOUR', 'CLAUNCHER', 'WEAVILE', 'BAXCALIBUR', 'AURORUS', 'DELCATTY', 'LAPRAS', 'REUNICLUS', 'FLAREON', 'ARON', 'MIENSHAO', 'LANTURN', 'SWADLOON', 'ARCTOVISH', 'POLIWAG', 'SHELMET', 'BARBARACLE', 'MEDITITE', 'SCIZOR', 'ZEBSTRIKA', 'BIANCA', 'STAKATAKA', 'CLEFFA', 'ARIA', 'CRAMORANT', 'THROH', 'MANAPHY', 'MELOETTA', 'PHANPY', 'DIANCIE', 'ESPEON', 'CLAWITZER', 'PERRSERKER', 'TYRANTRUM', 'ORICORIO', 'DACHSBUN', 'LATIOS', 'GROOKEY', 'CUTIEFLY', 'SOBBLE', 'BEHEEYEM', 'GLASTRIER', 'VENIPEDE', 'OMANYTE', 'GREEDENT', 'DIGGERSBY', 'COMBEE', 'SIGILYPH', 'MANTYKE', 'GEETA', 'GARDENIA', 'HUGH', 'GOLEM', 'NIDOQUEEN', 'PIDOVE', 'NACLSTACK', 'KRICKETOT', 'TOUCANNON', 'HONEDGE', 'VENONAT', 'GOLISOPOD', 'JOVI', 'BALTOY', 'DIALGA', 'DUSKULL', 'DRAYDEN', 'VENUSAUR', 'WINGULL', 'DUBWOOL', 'DURALUDON', 'VIKAVOLT', 'SKIDDO', 'LITLEO', 'FUECOCO', 'BLAINE', 'MINCCINO', 'YANMEGA', 'WURMPLE', 'DARKRAI', 'RESHIRAM', 'FLAPPLE', 'RELICANTH', 'VIGOROTH', 'SHELGON', 'VANILLUXE', 'PURRLOIN', 'EMPOLEON', 'DUNSPARCE', 'DRAGONAIR', 'XERNEAS', 'BOMBIRDIER', 'CHERUBI', 'NOSEPASS', 'WYRDEER', 'PAWMOT', 'FLOETTE', 'YUNGOOS', 'PINCURCHIN', 'DOTTLER', 'DEDENNE', 'COMFEY', 'BARRY', 'GARRET', 'VIVILLON', 'CATERPIE', 'ELECTRIKE', 'DIGLETT', 'SWELLOW', 'GASTLY', 'BAYLEEF', 'PRIMARINA', 'GRAFAIAI', 'DRAPION', 'GOLURK', 'PATRAT', 'ILLUMISE', 'ROGGENROLA', 'CHERYL', 'GULPIN', 'BLISSEY', 'ADAMAN', 'RIBOMBEE', 'CHIKORITA', 'TENTACOOL', 'NOIBAT', 'ARCHIE', 'HOCUS', 'ZOROARK', 'TATSUGIRI', 'HATTREM', 'DURANT', 'STUFFUL', 'TEDDIURSA', 'DEOXYS', 'LOTAD', 'DUOSION', 'KIRLIA', 'CRABRAWLER', 'FRIGIBAX', 'DARUMAKA', 'KRABBY', 'SPRITZEE', 'HONCHKROW', 'TREVENANT', 'ABOMASNOW', 'SIMIPOUR', 'UXIE', 'ARCEUS', 'ROWLET', 'KARTANA', 'GOTHITELLE', 'BRIGETTE', 'BUGSY', 'KOFFING', 'BARLOW', 'SURSKIT', 'IGGLYBUFF', 'PALAFIN', 'NACLI', 'CRESSELIA', 'COSMOG', 'DUGTRIO', 'ANABEL', 'GRUBBIN', 'TREECKO', 'GRIMMSNARL', 'DODUO', 'RALTS', 'EMOLGA', 'CRISPIN', 'GEODUDE', 'THUNDURUS', 'AREZU', 'SEEL', 'IRIS', 'DRATINI', 'ENAMORUS', 'SLOWKING', 'CLAY', 'TYPHLOSION', 'FIDOUGH', 'ELGYEM', 'CARRACOSTA', 'KINGAMBIT', 'SEVIPER', 'SKUNTANK', 'PIDGEY', 'MUNCHLAX', 'VENOMOTH', 'CHARMELEON', 'HASSEL', 'JYNX', 'DRUDDIGON', 'MURKROW', 'CARMINE', 'FINNEON', 'PHEROMOSA', 'SANDYGAST', 'ERIKA', 'BASCULIN', 'AARUNE', 'SCOLIPEDE', 'CRADILY', 'DWEBBLE', 'QWILFISH', 'CHINCHOU', 'COLZA', 'BRONZOR', 'CELESTEELA', 'WIGLETT', 'DULSE', 'GASTRODON', 'SEALEO', 'PALOSSAND', 'HAYLEY', 'MIMIKYU', 'OCTILLERY', 'HITMONLEE', 'XURKITREE', 'NECROZMA', 'DRAYTON', 'FINIZEN', 'SILCOON', 'LUDICOLO', 'SHIELDON', 'SHIFTRY', 'MAGEARNA', 'BOLDORE', 'GROVYLE', 'FLANNERY', 'CLAYDOL', 'HITMONTOP', 'GOLDEEN', 'TORTERRA', 'CORSOLA', 'BRONZONG', 'KELDEO', 'SKRELP', 'TYNAMO', 'FLORIAN', 'KORAIDON', 'HELENA', 'CYNDY', 'AGGRON', 'MARSHTOMP', 'ABSOL', 'PRIMEAPE', 'CARVANHA', 'POLIWRATH', 'KABUTOPS', 'STEELIX', 'SCRAGGY', 'EXEGGCUTE', 'STUNKY', 'PIGNITE', 'TOXICROAK', 'RUNERIGUS', 'TERRAKION', 'FOONGUS', 'PHANTUMP', 'PONYTA', 'GARDEVOIR', 'MIENFOO', 'POOCHYENA', 'BRENDA', 'GIMMIGHOUL', 'SNEASEL', 'TIRTOUGA', 'METAGROSS', 'PUMPKABOO', 'BUNEARY', 'GOLBAT', 'HOOTHOOT', 'FLAAFFY', 'GENGAR', 'BONNIE', 'GUMSHOOS', 'TAUROS', 'MEWTWO', 'FRIEDE', 'URSARING', 'CLOBBOPUS', 'SANDSHREW', 'BELDUM', 'ESPATHRA', 'CERULEDGE', 'RHYHORN', 'VANILLISH', 'GARGANACL', 'BUZZWOLE', 'LATIAS', 'BASTIODON', 'AUDINO', 'HEATRAN', 'LANDORUS', 'LAIRON', 'PERSIAN', 'BOLTUND', 'CURSOLA', 'AMOONGUSS', 'SNOM', 'DARTRIX', 'MAGBY', 'SCOVILLAIN', 'SALAMENCE', 'WALREIN', 'GHOLDENGO', 'DODRIO', 'SANDSLASH', 'REGIDRAGO', 'ELECTIVIRE', 'BRAWLY', 'FROSLASS', 'SQUIRTLE', 'ZWEILOUS'],
        'Star Fox' : ['STARWOLF', 'BIOWEAPONS', 'PEPPYHARE', 'ZAKO', 'BILLGREY', 'VULCAIN', 'FOXMCCLOUD', 'AMANDATOAD', 'ARUGI', 'SCRAPWORM', 'KATTMONROE', 'ZAZAN', 'GORGON', 'KRYSTAL', 'BOOUNIT', 'APAROID', 'OCTOMAN', 'ALGY', 'GORAS', 'GOLAS', 'GRIPPYTOAD', 'LUCYHARE', 'SLIPPYTOAD', 'DASHBOWMAN', 'MIYU', 'VIVIANHARE', 'ANDROSS'],
        'Fire Emblem' : ['BENNY', 'CHERCHE', 'CAELDORI', 'CAIN', 'CLANNE', 'ALFRED', 'CATALENA', 'AMBER', 'CATRIA', 'AION', 'CANAS', 'AUGUST', 'BRIGHTON', 'CONOMOR', 'ATLAS', 'ALDER', 'AMID', 'BARTHE', 'COLM', 'ALVA', 'AZAMA', 'ATHOS', 'CAESAR', 'CERVANTES', 'BARST', 'CLAIR', 'ARVAL', 'BRUNNYA', 'ASHURENA', 'BRYCE', 'ASBEL', 'ALTINA', 'DAISY', 'BREGUET', 'CYNTHIA', 'CHULAINN', 'CHARLOT', 'BANTU', 'CORDELIA', 'DALSIN', 'BRAMIMOND', 'CECILIA', 'CITRINNE', 'DAGDAR', 'ARRAN', 'CHALARD', 'AMELIA', 'CLIVE', 'DALTON', 'AIAS', 'ASTOLFO', 'ANNA', 'CYRIL', 'BORD', 'BEOWOLF', 'ASTRAM', 'DAICHI', 'CAINEGHIS', 'BORS', 'BOUCHERON', 'ALFONSE', 'CALILL', 'ALEAR', 'BELF', 'BOAH', 'CHROM', 'CLEMENT', 'BROM', 'CAMERON', 'ALCRYST', 'AZELLE', 'CORD', 'BRADY', 'ASTRID', 'ALICE', 'BAUKER', 'ARAN', 'BECK', 'ARCARD', 'CAEDA', 'BLOOM', 'ASUGI', 'BURTON', 'DAKOVA', 'DAGR', 'AVERSA', 'BOOL', 'ARTUR', 'ALAN', 'AYRA', 'ALEC', 'BRIGID', 'BRUNO', 'ARDEN', 'ARTHUR', 'CAMILLA', 'CALLUM', 'ASAELLO', 'AGONY', 'CECIL', 'ATHENA', 'CAMUS', 'CASSIUS', 'CORRIN', 'CHARLOTTE', 'DALEN', 'BOEY', 'ARLEN', 'CONRAD', 'ARVIS', 'BUNET', 'BASILIO', 'BLAKE', 'ALTENA', 'CLARISSE', 'CAMPARI', 'CORMAG', 'ANANKOS', 'ARES', 'CATH', 'AMALDA', 'ACHERON', 'BERUKA', 'ARDRI', 'CAELLACH', 'ABEL', 'CANDACE', 'ANNAND', 'AZURA', 'CREIDNE', 'BOIES', 'CELICA', 'BOYD', 'ASKR', 'BERKUT', 'BARTRE', 'ALGOL', 'ASHERA', 'COIRPRE', 'CLARINE', 'CLAUD', 'BASTIAN', 'BALMER', 'CASTOR', 'ALEN', 'ARETE', 'CARRION'],
        'Pikmin' : ['ALPH', 'BRITTANY', 'BULBIE', 'OATCHI', 'LOUIE', 'OLIMAR', 'PIKMIN', 'LEAFLING', 'CHARLIE'],
        'Xenoblade Chronicles' : ['SESAME', 'LEKU', 'SHARLA', 'ARDA', 'MINNIE', 'TEELAN', 'KILAKI', 'PIPIKI', 'BIONIS', 'KIROKI', 'GALEA', 'PELUPELU', 'KACHA', 'WERNER', 'ABABA', 'FIORA', 'RICOTH', 'JARACK', 'JUJU', 'TUZU', 'NIKITA', 'RAKZET', 'ATAEL', 'ELIOR', 'EWAN', 'MERISA', 'DOBADOBA', 'TYREA', 'XEKIT', 'BOZATROX', 'RIZAKA', 'KOKORA', 'PACHIPA', 'MILLER', 'DAKUKU', 'SYLVIANE', 'LUPA', 'NARINE', 'ADIDI', 'GADOLT', 'MECHONIS', 'RASHA', 'KALEKA', 'MELIA', 'NIRANIRA', 'BERRYJAMMY', 'RONO', 'VRONIK', 'TALIA', 'DEAN', 'LEOPOLD', 'MORITZ', 'SCARLEN', 'KAELIN', 'CHERYL', 'VIDIAN', 'KARLOS', 'CAUL', 'YURA', 'VOLTAK', 'VANGARRE', 'MATRYONA', 'DONNIS', 'LESUNIA', 'MIGAGA', 'OLEKSIY', 'LUNARA', 'ELEQA', 'ARNAUT', 'ANNA', 'MEFIMEFI', 'NELO', 'SATATA', 'PIKO', 'OTHARON', 'GORMAN', 'DUNBAN', 'XORD', 'KANTZ', 'MONICA', 'MODAMO', 'ONTOS', 'YALDABAOTH', 'JOLELE', 'RAOUL', 'HOKO', 'VANEA', 'SONIA', 'PEPPINO', 'JIROQUE', 'POKAPOKA', 'DOROTHY', 'SHALEN', 'GIORGIO', 'MEDI', 'QOFARIA', 'DEDEBA', 'SUZANNA', 'MARCIA', 'REYN', 'BETTY', 'NATALIA', 'PERRINE', 'DAZA', 'DICKSON', 'GALVIN', 'ORKATIX', 'MIXIK', 'PEPA', 'EARNEST', 'ZARKORT', 'BOKOKO', 'GOWAGO', 'LILIANA', 'LUKAS', 'OLGA', 'NENE', 'LORITHIA', 'MIRIALL', 'DABIDABI', 'YUSA', 'PAMA', 'KURRALTH', 'KURIKU', 'MIQOL', 'BATUBATU', 'ARGLAS', 'LECROUGH', 'SHILX', 'TALONYTH', 'ZAIN', 'THEO', 'GERUGU', 'YUMEA', 'ROZEAL', 'KAZAT', 'CHERRI', 'DULLAND', 'ROSEMARY', 'ERIK', 'NAROTH', 'BANA', 'DEKI', 'ARIELLE', 'DIONYSIS', 'RUTHAN', 'TATI', 'KLAUS', 'PROX', 'PUKO', 'ROCCO', 'KINO', 'PAOLA', 'GALDO', 'GADADA', 'POPIPO', 'SHURA', 'KOFUKO', 'NORARA', 'SHULK', 'EGIL', 'ANDREAS', 'LINADA', 'LALAPA', 'MIKO', 'MINANA', 'JACKSON', 'RIKI', 'CIAN'],
        'Splatoon' : ['SPYKE', 'FRYE', 'HARMONY', 'SHIVER', 'BISK', 'MARINAIDA', 'SHELDON', 'JELFONZO', 'NAILS', 'BOBDUB', 'GNARLYEDDY', 'JELLAFLEUR', 'ANNIE', 'ISOPADRE', 'JELONZO', 'MARIE', 'JUDD', 'DJOCTAVIO', 'INKLING', 'MURCH', 'CALLIE', 'BIGMAN', 'FLOW', 'PEARL', 'CRUSTYSEAN'],
        'Kirby' : ['ELFILIN', 'POPOPO', 'KRACKO', 'CAPTAINVUL', 'LANDIA', 'RIBBON', 'DAROACH', 'CHILLY', 'MACEKNIGHT', 'BUGZZY', 'BEADRIX', 'TUFF', 'HOTHEAD', 'MASTERHAND', 'ROCKY', 'DYNABLADE', 'METAKNIGHT', 'BOXBOXER', 'SQUASHINI', 'STORO', 'SAILORDEE', 'DOMWOOLE', 'ELLINE', 'TARANZA', 'KIRBY', 'MAGMAN', 'CLAWROLINE', 'WADDLEDOO', 'ICEDRAGON', 'FLAMER', 'SPINNI', 'ADELEINE', 'IRONMOM', 'KEEBY', 'MAIMAIGOON', 'SQUISHY', 'RICK', 'KNUCKLEJOE', 'GORIMONDO', 'HYNESS', 'GOOEY', 'BUTTERFLY', 'MOONJA', 'MARA', 'NAGO', 'PHANPHAN', 'BOMBAR', 'KABU', 'SILLYDILLO', 'GREENKIRBY', 'TIFF', 'STARDREAM', 'BRONTOBURT', 'ZERO', 'LOLA', 'MARX', 'SIMIRROR', 'NIGHTMARE', 'NECRODEUS', 'MAGOLOR', 'KINGDEDEDE', 'ACRO', 'AXKNIGHT', 'JUKID', 'BONKERS', 'LADYLIKE', 'KINE', 'LEONGAR', 'ESCARGOON', 'DRAWCIA', 'FECTOFORGO', 'GRIZZO', 'DARKMIND', 'CHUCHU', 'ZEROTWO', 'BLOCKY', 'MARXSOUL', 'PITCH', 'WADDLEDEE'],
        'Donkey Kong' : ['SKOWL', 'TIKITONG', 'KLUDGE', 'DONKEYKONG', 'KEROZENE', 'CRANKYKONG', 'LANKYKONG', 'KROW', 'DIXIEKONG', 'DREADKONG', 'PAULINE', 'KARATEKONG', 'XANANAB', 'DOUBLETUSK', 'ARMYDILLO', 'ZINGER', 'SUMOKONG', 'SCRUFFROC', 'TINYKONG', 'KASS', 'FUNKYKONG', 'VERYGNAWTY', 'MARIO', 'BARBOS', 'KUDGEL', 'SUPERKONG', 'KALYPSO', 'FUGU', 'STANLEY', 'SNIDE', 'CORDIAN', 'SWANKYKONG', 'POMPY', 'WIZPIG', 'KLUBBA', 'KONGFAMILY', 'MARACAGANG', 'DUMBDRUM', 'XYLOBONE', 'CANDYKONG', 'KAOS', 'NINJAKONG', 'DIDDYKONG', 'BASHMASTER', 'KIDDYKONG', 'BELCHA', 'ARICH', 'WACKYPIPES', 'CHUNKYKONG'],
        'Dragon Quest' : ['TERRY', 'SLIME', 'ASHLYNN', 'SHELLEY', 'CELESTRIA', 'GOOBER', 'HERO', 'HEALIE', 'ERDRICK', 'STERLING', 'ROCKET', 'MORRIE', 'CETACEA', 'TRODE', 'GOOWAIN', 'CARVER', 'DWIGHT', 'LIZZIE', 'BARBARUS', 'SABER', 'HENDRIK', 'NEVAN', 'ALENA', 'RUFF', 'AUSTER', 'ANGELO', 'MERCURY', 'KIEFER', 'DRAGONLORD', 'STARKERS', 'PATTY', 'KINGSLEY', 'ERIK', 'BIANCA', 'AMOS', 'PSARO', 'CORVUS', 'MARIBEL', 'AQUILA', 'CURIE', 'JADE', 'STELLA', 'SANCHO', 'MILLY', 'VERONICA', 'ERINN', 'SELLMA', 'PAVO', 'SYLVANDO', 'IVOR', 'SPOT', 'PARRY', 'SERENA', 'LUMINARY', 'TUPPENCE', 'GREYGNARL', 'BORYA', 'AISHE', 'KIRYL', 'YANGUS'],
        'Mother' : ['NINTEN', 'HINAWA', 'POKEY', 'PIPPI', 'LLOYD', 'TEDDY', 'ANDONUTS', 'DUSTER', 'PAULA', 'KUMATORA', 'FASSAD', 'NESS', 'SALSA', 'MINCH', 'BONEY', 'PORKY', 'GIYGAS'],
        'F-Zero' : ['LILYFLYER', 'DRAQ', 'FALCON', 'MEGAN', 'KATEALEN', 'BIOREX', 'SPADE', 'BERSERKER', 'KUMIKO', 'JACKLEVIN', 'SUPERARROW', 'NICHI', 'KENTAKECHI', 'PHOENIX', 'LORDCYBER', 'JODYSUMMER', 'ZODA', 'DAISANGEN', 'BEASTMAN', 'LEON', 'DONGENIE', 'JOHNTANAKA', 'OCTOMAN', 'PICO', 'DEATHBORN', 'DAIGOROH', 'BILLY', 'THESKULL'],
        'Final Fantasy' : ['DONA', 'JESSIE', 'GORKY', 'SHERA', 'YUNA', 'CHOLE', 'SHINRA', 'TREMA', 'HANA', 'ZANGAN', 'ISAARU', 'PRISCILLA', 'BUTCH', 'LIAN', 'BARTHELLO', 'ELEANOR', 'RAMUH', 'VIDINA', 'WANTZ', 'SETO', 'BENZO', 'TSENG', 'JOHNNY', 'LOGOS', 'BECLEM', 'SHUYIN', 'SKOTCH', 'RUDE', 'SHELINDA', 'TOBLI', 'WEDGE', 'LEBLANC', 'SHIVA', 'NOOJ', 'ZAON', 'STANIV', 'LUCIL', 'ORMI', 'JECHT', 'AYDE', 'CHAPPU', 'RIKKU', 'BARALAI', 'BIGGS', 'PALMER', 'ELENA', 'LENNE', 'DYNE', 'CHEKHOV', 'AMBROSIA', 'ELMA', 'PHOENIX', 'YUFFIE', 'AURON', 'VALVADOS', 'HEIDEGGER', 'IFRIT', 'YAIBAL', 'CLAUDIA', 'NOPPO', 'MUKKI', 'BUGENHAGEN', 'TEIOH', 'BROTHER', 'SCARLET', 'SEMUSI', 'ESTER', 'LULU', 'NHADALA', 'GARUDA', 'PACCE', 'TARO', 'KOTCH', 'SHAKE', 'GIPPAL', 'JENOVA', 'BARKEEP', 'TIFA', 'CLASKO', 'MAECHEN', 'HOLZOFF', 'TIDUS', 'CLOUD', 'TITAN', 'BAHAMUT', 'BUDDY', 'PAINE', 'MARODA', 'IFALNA', 'ODIN', 'YAMSKI', 'SEPHIROTH', 'VEGNAGUN', 'RENO', 'WAKKA'],
        'Super Smash Bros.' : ['YOSHI', 'CHROM', 'PALUTENA', 'TOONLINK', 'TRAINER', 'MIIFIGHTER', 'DARKPIT', 'LITTLEMAC', 'PACMAN', 'BOWSERJR', 'DUCKHUNT', 'MEGAMAN', 'ROB', 'JIGGLYPUFF', 'LUIGI', 'YOUNGLINK', 'PYRA', 'RIDLEY', 'ZELDA', 'MARTH', 'PIKACHU', 'ROSALINA', 'TERRY', 'BYLETH', 'MARIO', 'ISABELLE', 'LUCAS', 'CLOUD', 'WARIO', 'LUCINA', 'SIMON', 'SONIC', 'SQUIRTLE', 'MYTHRA', 'CORRIN', 'SAMUS', 'HERO', 'LUCARIO', 'PEACH', 'SORA', 'KIRBY', 'SNAKE', 'OLIMAR', 'CHARIZARD', 'SHEIK', 'PICHU', 'KAZUYA', 'GRENINJA', 'RICHTER', 'SHULK', 'ROBIN', 'BAYONETTA', 'FALCO', 'JOKER', 'SEPHIROTH', 'VILLAGER', 'INKLING', 'STEVE', 'LINK', 'INCINEROAR', 'MEWTWO', 'DAISY', 'GANONDORF', 'IVYSAUR', 'BOWSER', 'NESS', 'WOLF', 'FALCON']
    }
    if (url.length === 1) { //If site was not loaded from a shared answer link, there won't be query params
        const keys = Object.keys(answers_obj);
        //BELOW FOR LOOP USED FOR QUICK TESTING TO MAKE SURE ALL NAMES ARE WITHIN LENGTH LIMIT
        // for (let k = 0; k < keys.length; k++) {
        //     for (let i = 0; i < answers_obj[keys[k]].length; i++) {
        //         if (answers_obj[keys[k]][i].length > 10 || answers_obj[keys[k]][i] <= 3) {
        //             c(answers_obj[keys[k]][i]);
        //         }
        //     }
        // }
        const random_key = keys[Math.floor(Math.random() * keys.length)]; //Random object key
        answer = answers_obj[random_key][Math.floor(Math.random() * answers_obj[random_key].length)]; //Answer is a random index from an array that is the value of the random key
        $('#answer_franchise').on('click', () => {
            showFranchise(random_key); //Calling the showFranchise this way stops the function from auto running
        });
        genLink(random_key, answer);
    } else if (url.length === 2) {//If site was loaded from a shared answer link, length of array will be 2
        try {
            const decodedURIanswer = decodeURIComponent(url[url.length -1].split('=')[url.length -1]); //Decodes query param URI component so it's just in base64 encoding
            const decodedB64answer = atob(decodedURIanswer); //Decodes query param from base64
            const queryParams = decodedB64answer.split(','); //Splits query into object key (answer franchise) and answer
            const key = queryParams[0]; //Answer franchise
            answer = queryParams[1]; //Answer
            $('#answer_franchise').on('click', () => {
                showFranchise(key); //Calling the showFranchise this way stops the function from auto running
            });
            genLink(key, answer);
        } catch (err) { //Removes query from url and reloads site if there was an error with the sharable link
            window.history.replaceState({}, document.title, url[0]); //Removes query param from url before reload
            location.reload(true);
        }
    }
}
genAnswer();

let cols = answer.length;
let rows;
let guesses = 0;
const $scores_container = $('#scores_container');
const $hide_scores = $('#hide_scores');
const $info_container = $('#info_container');
const $hide_info = $('#hide_info');
const $copy_icon = $('#copy_icon');
let prevent_event = false; //Prevents keyboard event listener when needed
let finished = false; //Prevents keyboard event listener after game is finished

//Draws game grid
let drawGrid = () => {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    if (windowWidth <= 600) { 
        $('#grid_container').css('grid-template-columns', `repeat(${cols}, minmax(25px, 40px))`);
    } else if (windowWidth > 600 && windowHeight < 800) {
        $('#grid_container').css('grid-template-columns', `repeat(${cols}, minmax(25px, 50px))`);
    } else if (windowHeight <= 1000) {
        $('#grid_container').css('grid-template-columns', `repeat(${cols}, minmax(25px, 65px))`);
    } else { 
        $('#grid_container').css('grid-template-columns', `repeat(${cols}, minmax(50px, 80px))`);
    }
}

//If width > 600 & height < 800

//Number of rows is determined by number of columns
function determineRows() {
    if (cols <= 5) {
        rows = 6;
    } else if (cols > 5 && cols <= 7) {
        rows = 7;
    } else if ( cols > 7) {
        rows = 8;
    }
    let numDivs = cols * rows;
    for (let i = 0; i < numDivs; i++) {
        let div = $('<div>');
        $('#grid_container').append(div);
    }
    drawGrid(cols);
}
determineRows();

//Assigns row-class for divs in grid rows
function AssignRowClasses() {
    let gridDivs = Array.from($("#grid_container > *"));
    gridDivs.forEach((item, index) => {
        let rowClass = `row-${Math.floor(index / cols + 1)}`;
        item.classList.add(rowClass);
        $(item).attr('finished', false);
});
} 
AssignRowClasses();

const show_scores = () => {
    hide_info();
    prevent_event = true; 
    $scores_container.show();
}

const hide_scores = () => {
    $scores_container.hide();
    prevent_event = false; 
}

const clear_scores = () => {
    localStorage.removeItem('scores');
    get_scores();
}

const show_info = () => {
    hide_scores();
    prevent_event = true;
    $info_container.show();
}

const hide_info = () => {
    $info_container.hide();
    prevent_event = false; 
}

//Buttons listen for click events
$(document).ready(function() {
    $('#scores_button').on('click', get_scores);
    $('#hide_scores').on('click', hide_scores);
    $('#clear_scores').on('click', clear_scores);
    $('#info_button').on('click', show_info);
    $('#hide_info').on('click', hide_info);
    $('#play_again').on('click', () => {
        window.history.replaceState({}, document.title, url[0]); //Removes query param from url before reload
        location.reload(true);
    });
    $copy_icon.on('click', () => {
        $('#custom_link').select(); //Selects custom link 
        navigator.clipboard.writeText($('#custom_link').text()); //Writes custom link to clipboard
        $('#copy_notification').attr('open', '');
        setTimeout(() => $('#copy_notification').removeAttr('open'), 2000);     
    });
    window.addEventListener('resize', drawGrid); //Redraws the grid when window is resized
});

let userAnswer = '';
let rowIndex = 0;
let colIndex = 0;

this.addEventListener('keyup', (e) => enterInput(e.key));

function enterInput(e) {
    if (prevent_event === true) return;
    if (finished === true) return;
    let str = e;
    if (str === 'Backspace') {
        let notEmptyDivs = Array.from($('#grid_container > div[finished="false"]:not(:empty)')); //Array of divs that have a character in them and do not have finished attribute
        $(notEmptyDivs[notEmptyDivs.length - 1]).text(''); //Deletes last character
        $(notEmptyDivs[notEmptyDivs.length - 1]).css('transform', 'scale(1)'); //Animates div's scale
        colIndex === 0 ? colIndex = 0 : colIndex -= 1; //Decrements column index by 1
    } else if (str === 'Enter') {
        if (colIndex === cols) { //Makes sure current culumn is last culumn 
            let finishedDivs = Array.from($('#grid_container > div:not(:empty)')); //Creates array of divs that have characters
            let answerDivs = Array.from($('#grid_container > div:not([finished=true]):not(:empty)'));
            let user_answer = '';
            answerDivs.forEach(div => user_answer += $(div).text());
            let in_array = false; //Check if user input is in name list
            for (const key in answers_obj) {
                if (answers_obj[key].includes(user_answer)) {
                    in_array = true;
                    break;
                }
            }
            if (!in_array) {
                $('#not_in_list').attr('open', 'true');
                answerDivs.forEach(div => {
                    $(div).addClass('shake');
                });
                setTimeout(() => {
                    answerDivs.forEach(div => {
                        $(div).removeClass('shake');
                    });
                }, 1000);
                setTimeout(() => $('#not_in_list').removeAttr('open'), 1700);
            } else if (in_array === true) {
                finishedDivs.forEach(div => {
                    $(div).attr('finished', true); //Sets finished attribute to true for divs in finished array
                });
                colIndex = 0 //Resets column index
                rowIndex += 1; //Increments row index to next row
                checkAnswer(); //Calls check answer function 
            }
            user_answer = '';
        }
    } else if (colIndex < cols) { //Checks if column index isn't greater than length of columns 
        if (str.length === 1) {
            const allowedChars = /[A-Z]/i;
            if (allowedChars.test(str)) { //Tests if character being submitted is allowed
                let emptyDivs = Array.from($('#grid_container > div[finished="false"]:empty')); //Creates array of empty divs that aren't marked as finished
                if ($(window).width() >= 950) { //Animates div's scale
                    $(emptyDivs[0]).css('transform', 'scale(1.14)');
                } else if ($(window).width() < 950) {
                    $(emptyDivs[0]).css('transform', 'scale(1.05)');
                }
                $(emptyDivs[0]).text(str.toUpperCase()); //Changes div's text to submitted character
                colIndex += 1;
            }
        }
    }
}

//Virtual keyboard keys
let kb_keys = $('.kb_key')
for (let i = 0; i < kb_keys.length; i++) {
    $(kb_keys[i]).click(() => {
        enterInput($(kb_keys[i]).data('key'));
        $(kb_keys[i]).blur();
    })
}

function get_scores (win, guess) {
    let scores = JSON.parse(localStorage.getItem('scores'));
    //Builds scores object if it doesn't already exist
    if (scores === null) scores = {
        1 : 0, 2 : 0, 3 : 0, 4 : 0, 5 : 0, 6 : 0, 7 : 0, 8 : 0, 'Played' : 0, 'Win' : 0, 'Lost' : 0,
        'Win %' : 0
    };
    switch(win) {
        case true:
            for (const key in scores) {
                if (guess === parseInt(key)) scores[key] += 1;
            }
            scores['Win'] += 1;
            scores['Played'] += 1;
            break;
        case false:
            scores['Lost'] += 1;
            scores['Played'] += 1;
            break;
        case undefined: //If scores is shown without game being finished
            break;
        default:
            break;
    }
    //Avoids division by 0
    if (scores['Played'] === 0) {
        scores['Win %'] = 0;
    } else if (scores['Played'] !== 0) {
        scores['Win %'] = Math.round(((scores['Win'] / scores['Played']) * 100));
    }
    try {
        localStorage.setItem('scores', JSON.stringify(scores)); //Sets scores object in browser's local storage
    } catch(err) {
        // Create error dialog
        c(err)
    } finally {
        $('h3').text(`${scores['Played']} Games Played`);
        $('h4').text(`${scores['Win %']}% Won`);
        //Displays guess distribuition 
        let childDivs = $('#scores_container').children('#scores');
        for (let i = 0; i < childDivs.length; i++) {
            switch(i) {
                case 0:
                    $(childDivs[i]).text(`1st Guess -   ${scores[1]}`);
                    break;
                case 1:
                    $(childDivs[i]).text(`2nd Guess -   ${scores[2]}`);
                    break;
                case 2:
                    $(childDivs[i]).text(`3rd Guess -   ${scores[3]}`);
                    break;
                case 3:
                    $(childDivs[i]).text(`4th Guess -   ${scores[4]}`);
                    break;
                case 4:
                    $(childDivs[i]).text(`5th Guess -   ${scores[5]}`);
                    break;
                case 5:
                    $(childDivs[i]).text(`6th Guess -   ${scores[6]}`);
                    break;
                case 6:
                    $(childDivs[i]).text(`7th Guess -   ${scores[7]}`);
                    break;
                case 7:
                    $(childDivs[i]).text(`8th Guess -   ${scores[8]}`);
                    break;
                default:
                    break;
            }
        }
        //Brings up the scores dialog 
        show_scores();
    }
}

//End dialog messages
const finishDialog = (message, win) => {
    const dialog = $('<dialog id="finish_dialog">');
    $(dialog).append(`<p>${message}</p>`);
    $(dialog).attr('open', '');
    $('#finish_dialog_container').append(dialog);
    switch(win) {
        case true:
            $('#finish_dialog').css('animation', 'fade-in-out 2s forwards');
            setTimeout(() => dialog.removeAttr('open'), 2000 );
            break;
        case false:
            $('#finishDialog').css('animation', 'fade-in 1s forwards');
            $('#finish_dialog').append('<button>X</button>');
            $('#finish_dialog > button').on('click', () => {
                $('#finish_dialog_container').css('display', 'none');
            });
            break;
        default:
            break;
    }
}

function finish(guess) {
    finished = true;
    let win;
    //If game won
    if (guess !== undefined) {
        win = true;
        switch (guess) {
            case 1: //First game
                finishDialog('Flawless!', win);
                break;
            case rows: //Last guess
                finishDialog('That was close!', win);
                break;
            case 2:
                finishDialog('Amazing!', win);
                break;
            case 3: 
                finishDialog('Fantastic!', win);
                break;
            case 4:
                finishDialog('Great!', win);
                break;
            case 5:
                finishDialog('Good job!', win);
                break;
            case 6:
                finishDialog('Got it!', win);
                break;
            default:
                break;
        }
        //Delays auto showing scores
        setTimeout(function() {
            get_scores(win, guess);
        }, 2500);
    } else if (guess === undefined) { //If game lost
        win = false;
        finishDialog(`close!<br>The name is<br>${answer}`, win);
        //Delays auto showing scores
        setTimeout(function() {
            get_scores(win);
        }, 3000);
    }
}

//Adds class to animate the color change of divs
const colorDivs = (div, color) => $(div).addClass(`animate-${color}`);

//Adds class to animate the color change of keyboard keys
const colorKeys = (char, color) => {
    for (let i = 0; i < kb_keys.length; i++) {
        if ($(kb_keys[i]).data('key') === char) {
            $(kb_keys[i]).removeClass((index, className) => {
                const classes = className.split(' ');
                return classes.filter((classIndex) => classIndex !== 'kb_key').join(' '); //Removes all classes besides default kb_key class
            }).addClass(`animate-${color}`); //Adds color animation class
        }
    }
}

function checkAnswer() {
    guesses += 1;
    //Builds user answer string
    $(`div.row-${rowIndex}`).each(function() {
        userAnswer += $(this).text();
    }); 
    let copyString = userAnswer; //Copy of user answer string
    let answeredDivs = $(`.row-${rowIndex}`).toArray(); //Divs that have already been entered
    let greenArr = []; //Array holds correctly guessed letters
    let positions = {}; //Object keys hold answer letters, values are the indexes of positions
    //Loop builds positions object
    for (let i = 0; i < answer.length; i++) {
        let letter = answer[i];
        if (!positions[letter]) {
            positions[letter] = [];
        }
        positions[letter].push(i);
    }
    //Updating each guess
    let green = 'green';
    let yellow = 'yellow';
    let grey = 'grey';
    let dark_grey = 'dark-grey';
    for (let i = 0; i < copyString.length; i++) { //Loops through user answer
        if (positions[userAnswer[i]]) { //If user answer letter is a key in positions
            let char = userAnswer.charAt(i); //Creating variable of current character
            guessedLetterPositions = positions[userAnswer[i]]; //Array of correct indicies of letter
            if (positions[userAnswer[i]].includes(userAnswer.indexOf(char))) {
                colorDivs(answeredDivs[i], green); //Colors div green
                colorKeys(char, green); //Colors keyboard key green
                greenArr.push(char); //Pushes correct guessed character to greenArr
            } else {
                let charCount = 0; //Occurences of character guessed
                for (let x = 0; x < userAnswer.length; x++) {
                    if (userAnswer.charAt(x) === char) charCount ++;
                }
                for (let x = 0; x < greenArr.length; x++) {
                    if (greenArr[x] === char) charCount ++;
                }
                if (guessedLetterPositions.length >= charCount) {
                    colorDivs($(answeredDivs[i]), yellow); //Colors div yellow
                    colorKeys(char, yellow); //Colors keyboard key yellow
                } else {
                    colorDivs($(answeredDivs[i]), grey) //Colors div grey if letter is in answer, but used up
                }
            }
            userAnswer = userAnswer.replace(char, '1'); //Replaces character checked, so the next character can be checked
        } else {
            colorDivs($(answeredDivs[i]), grey); //Colors div grey
            colorKeys(copyString[i], dark_grey); //Colors keyboard key dark grey
        }
    }

    if (greenArr.length === answer.length) {
        finish(guesses);
    } else if (rowIndex === rows) {
        finish();
    }
    //Resets positions object, user answer string, and green char array for each word check
    positions = {};
    userAnswer = '';
    greenArr = [];
}
