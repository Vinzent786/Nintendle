const c = (x) => {return console.log(x)} //For more convenient testing 
let answer;
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
    const answers_obj = {
        'Zelda' : ['MEDLI', 'LINK', 'DINOLFOS', 'MOOSH', 'NABOORU', 'MINERU', 'FYSON', 'FARORE', 'KUKIEL', 'BIGGORON', 'KOUME', 'DAMPE', 'LANA', 'LEVIAS', 'ASHEI', 'BARNES', 'KILTON', 'KOMALI', 'CIELA', 'HESTU', 'MAPLE', 'MALO', 'MOON', 'HINOX', 'AURU', 'ERROR', 'MIKAU', 'DARBUS', 'BORVILLE', 'ARYLL', 'DIN', 'CARLOV', 'GHIRAHIM', 'EZLO', 'GONGORON', 'BELLUM', 'MALANYA', 'FAIRY', 'CYCLOS', 'MAGGIE', 'DANGORO', 'EPONA', 'GORKO', 'GULLEY', 'CAROCK', 'DEMISE', 'GROG', 'DARUNIA', 'COLIN', 'KAPSON', 'ASTOR', 'BLOSSOM', 'BIPIN', 'FARON', 'ALFONZO', 'BULIARA', 'MUTOH', 'NAVI', 'MIDO', 'JOSHA', 'NAYRU', 'GROOSE', 'ELDIN', 'DIMITRI', 'ANKLE', 'BARKLE', 'GREYSON', 'DARKNUT', 'MILA', 'ORDONA', 'GANON', 'GANONDORF', 'OCTAVO', 'GORIYA', 'DORIAN', 'LARUTO', 'BYRNE', 'AVEIL', 'MEDIGORON', 'ILIA', 'BEEDLE', 'KOTAKE', 'AGITHA', 'KASS', 'LINKLE', 'DARMANI', 'NIKO', 'IMPA', 'OOCCOO', 'LANAYRU', 'CADO', 'DARUK', 'HYLIA', 'LINEBECK', 'ZELDA', 'ANJU', 'INGO', 'MALON', 'BATREAUX', 'KOLTIN', 'CARPENTERS', 'PENN', 'AMALI', 'AGAHNIM', 'HARTH', 'FYER', 'ONOX', 'FADO', 'MAKAR', 'GRAMPS', 'ODOLWA', 'KAFEI', 'HUDSON', 'IRENE', 'MALLADUS', 'MIDNA', 'MARIN'],
        'Animal Crossing' : ['CARROT', 'BIFF', 'EUGENE', 'ANNALISA', 'CHESTER', 'BANGLE', 'BEARDO', 'CUPCAKE', 'BONBON', 'CHRISSY', 'BOOMER', 'DOTTY', 'CASHMERE', 'BEAU', 'APOLLO', 'DRAKE', 'CAROLINE', 'BITTY', 'BUBBLES', 'CHERRY', 'DIGBY', 'APPLE', 'CHUCK', 'CHELSEA', 'ANICOTTI', 'CHIEF', 'COBB', 'AXEL', 'ANALOGUE', 'CEPHALOBOT', 'BRUCE', 'ELISE', 'AZALEA', 'COOKIE', 'CARLO', 'COPPER', 'CHADDER', 'CHERI', 'BESSIE', 'DOBIE', 'CHARLISE', 'DAISY', 'CLAUDIA', 'DORA', 'AGNES', 'BROFFINA', 'ELMER', 'ANTONIO', 'COLE', 'BLANCA', 'CHOPS', 'BENJAMIN', 'EPONA', 'AUDIE', 'COLTON', 'CYRUS', 'ELVIS', 'ALLI', 'ELOISE', 'FAUNA', 'CELIA', 'BLATHERS', 'AMELIA', 'CANBERRA', 'DIZZY', 'BREE', 'DIANA', 'EUNICE', 'BISKIT', 'DIVA', 'FANG', 'CHAMP', 'AZIZ', 'AVERY', 'ANABELLE', 'BUNNIE', 'CHABWICK', 'CLAUDE', 'EMERALD', 'CURLOS', 'CUBE', 'BELLE', 'ANNALISE', 'ELLIE', 'BELLA', 'BOONE', 'BREWSTER', 'DRAGO', 'CHICO', 'ASTRID', 'ALICE', 'CLERK', 'BROCCOLO', 'DELI', 'CLAY', 'DOZER', 'CARMEN', 'BECKY', 'BLAIRE', 'EMCEE', 'CURT', 'CLARA', 'ANKHA', 'BETTY', 'BUZZ', 'BEPPE', 'BAROLD', 'DERWIN', 'BLUEBEAR', 'CANDI', 'CURLY', 'CECE', 'BILLY', 'BONES', 'CROQUE', 'BENEDICT', 'CHEVRE', 'CAMOFROG', 'BUTCH', 'CHAI', 'CRANSTON', 'BOOKER', 'BERTHA', 'FAITH', 'CYRANO', 'DEIRDRE', 'CLEO', 'DEENA', 'CELESTE', 'DRIFT', 'CHOW', 'BIANCA', 'ERIK', 'BOOTS', 'BAABARA', 'CORNIMER', 'AURORA', 'BUCK', 'COACH', 'ANGUS', 'ALFONSO', 'FARLEY', 'BOYD', 'BETTINA', 'COCO', 'ANCHOVY', 'BORIS', 'CALLY', 'BLANCHE', 'AISLE', 'CHIP', 'BILL', 'COUSTEAU', 'EGBERT', 'CESAR', 'CLYDE', 'ADMIRAL', 'CARRIE', 'ELINA'],
        'Mario' : ['FLUZZARD', 'BARB', 'CHAN', 'BLITTY', 'FRANCIS', 'BOMBETTE', 'BIRDO', 'BROODALS', 'BOOMER', 'BOWSER', 'BETH', 'GARY', 'BRIGHTON', 'DASHELL', 'BOGMIRE', 'COURSEBOT', 'EDGE', 'CLEFTOR', 'GEARMO', 'DIMENTIO', 'ELDSTAR', 'AZALEA', 'FLURRIE', 'DOOPLISS', 'CAPPY', 'MARIO', 'CLAWGRIP', 'EXOR', 'DAISY', 'BESTOVIUS', 'ARFUR', 'WALUIGI', 'FLEEP', 'ELLA', 'ALEX', 'BAHAMUT', 'CHAUNCEY', 'BOWYER', 'BARRY', 'FRYGUY', 'BOSHI', 'BLOOEY', 'CORTEZ', 'EMILY', 'BROGGY', 'FROSTY', 'CLAY', 'DAPHNE', 'BOOLOSSUS', 'CUDGE', 'CURT', 'ROSALINA', 'FLIT', 'BELOME', 'BUZZ', 'BOOSTER', 'DOLPHIN', 'DODO', 'CHRIS', 'CHAD', 'FAWFUL', 'DORRIE', 'BONETAIL', 'ELROY', 'ALLIE', 'CACKLETTA', 'CHAKRON', 'CROCO', 'BOBBY', 'BELDAM', 'ELMO', 'BRIAN', 'DWEEZIL', 'BONECHILL', 'EYEROK', 'LUIGI', 'BOOTLER', 'BANKTOAD', 'WARIO', 'ELDEN', 'CARRIE', 'CHAS', 'DOTTIE'],
        'Pokémon' : ['FLINT', 'ANABEL', 'GLACIA', 'ELDES', 'CHOY', 'BLAINE', 'DRASNA', 'CRISPIN', 'JANINE', 'GAERIC', 'DENDRA', 'ERMA', 'HAYLEY', 'AGATHA', 'CHLOE', 'ADAMAN', 'BRIAR', 'DRAKE', 'HILBERT', 'CHARM', 'AMARYS', 'DARACH', 'CALABA', 'GORIGAN', 'CLAVELL', 'CHUCK', 'DUSTY', 'ALDER', 'ANTHE', 'AARON', 'IONO', 'CHOBIN', 'FABA', 'HASSEL', 'CLEMONT', 'HILDA', 'FALKNER', 'CLAIR', 'ERBIE', 'CARMINE', 'GIACOMO', 'EVELYN', 'CYNDY', 'CYNTHIA', 'JACQ', 'BENGA', 'GRANT', 'FANTINA', 'BETTIE', 'ELESA', 'HAPU', 'AMETHIO', 'CAITLIN', 'ILIMA', 'GEETA', 'CYRUS', 'CHERYL', 'CYLLENE', 'GHETSIS', 'AMELIA', 'CILAN', 'JASMINE', 'HALA', 'EUSINE', 'BLUE', 'BURGH', 'CLIFF', 'GREEN', 'BARRY', 'GLORIA', 'BONNIE', 'BRENDA', 'GINTER', 'HEATH', 'GORDOR', 'AVERY', 'ELITA', 'JOEL', 'ARLEY', 'DANA', 'COGITA', 'CAMERON', 'JUAN', 'ARIA', 'EMMA', 'ELAINE', 'BEDE', 'ERIKA', 'ATTICUS', 'GARRET', 'CLAY', 'CRAWFORD', 'FENNEL', 'GIOVANNI', 'GROCK', 'ARLO', 'CHILI', 'GRETA', 'ARCHER', 'BRIGETTE', 'BRANDON', 'COLRESS', 'BRAWLY', 'BRENDAN', 'EMMET', 'COLZA', 'GUZMA', 'BUZZ', 'CALEM', 'CHASE', 'FRIEDE', 'BRYCEN', 'HUGH', 'HELENA', 'DRAYTON', 'CRESS', 'GARDENIA', 'DAWN', 'BARLOW', 'ARVEN', 'JOVI', 'ARCHIE', 'CANDICE', 'BOOLUM', 'ACEROLA', 'ARDOS', 'BILLY', 'DAHLIA', 'AARUNE', 'AQUARELLA', 'AREZU', 'ELIO', 'BRASSIUS', 'ARIANA', 'CYRANO', 'INGO', 'FLANNERY', 'IRIDA', 'BIANCA', 'GLADION', 'BENI', 'CANDELA', 'BROCK', 'BUCK', 'DULSE', 'EDWARD', 'ARGENTA', 'EXOL', 'ISCAN', 'ISAAC', 'ALLISTER', 'ETHAN', 'BUGSY', 'DIANTHA', 'COIN', 'AKARI', 'BLANCHE', 'GRUSHA', 'GORDIE', 'IRIS', 'CLOVER', 'GRIMSLEY', 'HOCUS', 'FLORIAN', 'ANTHEA', 'CONCORDIA', 'CLYDE', 'DRAYDEN', 'BYRON'],
        'Star Fox' : ['GOLAS', 'ANDROSS', 'SCRAPWORM', 'GORAS', 'ZAZAN', 'GORGON', 'ALGY', 'OCTOMAN', 'KRYSTAL', 'BIOWEAPONS', 'ARUGI', 'APAROID', 'MIYU', 'VULCAIN', 'ZAKO'],
        'Fire Emblem' : ['BENNY', 'CHERCHE', 'CAELDORI', 'CAIN', 'CLANNE', 'ALFRED', 'CATALENA', 'AMBER', 'CATRIA', 'AION', 'CANAS', 'AUGUST', 'BRIGHTON', 'CONOMOR', 'ATLAS', 'ALDER', 'AMID', 'BARTHE', 'COLM', 'ALVA', 'AZAMA', 'ATHOS', 'CAESAR', 'CERVANTES', 'BARST', 'CLAIR', 'ARVAL', 'BRUNNYA', 'ASHURENA', 'BRYCE', 'ASBEL', 'ALTINA', 'DAISY', 'BREGUET', 'CYNTHIA', 'CHULAINN', 'CHARLOT', 'BANTU', 'CORDELIA', 'DALSIN', 'BRAMIMOND', 'CECILIA', 'CITRINNE', 'DAGDAR', 'ARRAN', 'CHALARD', 'AMELIA', 'CLIVE', 'DALTON', 'AIAS', 'ASTOLFO', 'ANNA', 'CYRIL', 'BORD', 'BEOWOLF', 'ASTRAM', 'DAICHI', 'CAINEGHIS', 'BORS', 'BOUCHERON', 'ALFONSE', 'CALILL', 'ALEAR', 'BELF', 'BOAH', 'CHROM', 'CLEMENT', 'BROM', 'CAMERON', 'ALCRYST', 'AZELLE', 'CORD', 'BRADY', 'ASTRID', 'ALICE', 'BAUKER', 'ARAN', 'BECK', 'ARCARD', 'CAEDA', 'BLOOM', 'ASUGI', 'BURTON', 'DAKOVA', 'DAGR', 'AVERSA', 'BOOL', 'ARTUR', 'ALAN', 'AYRA', 'ALEC', 'BRIGID', 'BRUNO', 'ARDEN', 'ARTHUR', 'CAMILLA', 'CALLUM', 'ASAELLO', 'AGONY', 'CECIL', 'ATHENA', 'CAMUS', 'CASSIUS', 'CORRIN', 'CHARLOTTE', 'DALEN', 'BOEY', 'ARLEN', 'CONRAD', 'ARVIS', 'BUNET', 'BASILIO', 'BLAKE', 'ALTENA', 'CLARISSE', 'CAMPARI', 'CORMAG', 'ANANKOS', 'ARES', 'CATH', 'AMALDA', 'ACHERON', 'BERUKA', 'ARDRI', 'CAELLACH', 'ABEL', 'CANDACE', 'ANNAND', 'AZURA', 'CREIDNE', 'BOIES', 'CELICA', 'BOYD', 'ASKR', 'BERKUT', 'BARTRE', 'ALGOL', 'ASHERA', 'COIRPRE', 'CLARINE', 'CLAUD', 'BASTIAN', 'BALMER', 'CASTOR', 'ALEN', 'ARETE', 'CARRION'],
        'Pikmin' : ['ALPH', 'BRITTANY', 'BULBIE', 'OATCHI', 'LOUIE', 'OLIMAR', 'PIKMIN', 'LEAFLING', 'CHARLIE'],
        'Xenoblade Chronicles' : ['SESAME', 'LEKU', 'SHARLA', 'ARDA', 'MINNIE', 'TEELAN', 'KILAKI', 'PIPIKI', 'BIONIS', 'KIROKI', 'GALEA', 'PELUPELU', 'KACHA', 'WERNER', 'ABABA', 'FIORA', 'RICOTH', 'JARACK', 'JUJU', 'TUZU', 'NIKITA', 'RAKZET', 'ATAEL', 'ELIOR', 'EWAN', 'MERISA', 'DOBADOBA', 'TYREA', 'XEKIT', 'BOZATROX', 'RIZAKA', 'KOKORA', 'PACHIPA', 'MILLER', 'DAKUKU', 'SYLVIANE', 'LUPA', 'NARINE', 'ADIDI', 'GADOLT', 'MECHONIS', 'RASHA', 'KALEKA', 'MELIA', 'NIRANIRA', 'BERRYJAMMY', 'RONO', 'VRONIK', 'TALIA', 'DEAN', 'LEOPOLD', 'MORITZ', 'SCARLEN', 'KAELIN', 'CHERYL', 'VIDIAN', 'KARLOS', 'CAUL', 'YURA', 'VOLTAK', 'VANGARRE', 'MATRYONA', 'DONNIS', 'LESUNIA', 'MIGAGA', 'OLEKSIY', 'LUNARA', 'ELEQA', 'ARNAUT', 'ANNA', 'MEFIMEFI', 'NELO', 'SATATA', 'PIKO', 'OTHARON', 'GORMAN', 'DUNBAN', 'XORD', 'KANTZ', 'MONICA', 'MODAMO', 'ONTOS', 'YALDABAOTH', 'JOLELE', 'RAOUL', 'HOKO', 'VANEA', 'SONIA', 'PEPPINO', 'JIROQUE', 'POKAPOKA', 'DOROTHY', 'SHALEN', 'GIORGIO', 'MEDI', 'QOFARIA', 'DEDEBA', 'SUZANNA', 'MARCIA', 'REYN', 'BETTY', 'NATALIA', 'PERRINE', 'DAZA', 'DICKSON', 'GALVIN', 'ORKATIX', 'MIXIK', 'PEPA', 'EARNEST', 'ZARKORT', 'BOKOKO', 'GOWAGO', 'LILIANA', 'LUKAS', 'OLGA', 'NENE', 'LORITHIA', 'MIRIALL', 'DABIDABI', 'YUSA', 'PAMA', 'KURRALTH', 'KURIKU', 'MIQOL', 'BATUBATU', 'ARGLAS', 'LECROUGH', 'SHILX', 'TALONYTH', 'ZAIN', 'THEO', 'GERUGU', 'YUMEA', 'ROZEAL', 'KAZAT', 'CHERRI', 'DULLAND', 'ROSEMARY', 'ERIK', 'NAROTH', 'BANA', 'DEKI', 'ARIELLE', 'DIONYSIS', 'RUTHAN', 'TATI', 'KLAUS', 'PROX', 'PUKO', 'ROCCO', 'KINO', 'PAOLA', 'GALDO', 'GADADA', 'POPIPO', 'SHURA', 'KOFUKO', 'NORARA', 'SHULK', 'EGIL', 'ANDREAS', 'LINADA', 'LALAPA', 'MIKO', 'MINANA', 'JACKSON', 'RIKI', 'CIAN'],
        'Splatoon' : ['INKLING', 'SPYKE', 'JUDD', 'SHELDON', 'HARMONY', 'CALLIE', 'MARIE', 'SHIVER', 'JELFONZO', 'FLOW', 'NAILS', 'ANNIE', 'BISK', 'FRYE', 'MURCH', 'PEARL', 'JELONZO'],
        'Kirby' : ['NAGO', 'CHILLY', 'MOONJA', 'ADELEINE', 'SIMIRROR', 'LANDIA', 'JUKID', 'LOLA', 'KEEBY', 'BEADRIX', 'SILLYDILLO', 'KINE', 'TIFF', 'TUFF', 'MARX', 'ACRO', 'DRAWCIA', 'BLOCKY', 'ROCKY', 'CHUCHU', 'BOMBAR', 'NECRODEUS', 'ESCARGOON', 'ELFILIN', 'SPINNI', 'SQUISHY', 'CLAWROLINE', 'RIBBON', 'SQUASHINI', 'GORIMONDO', 'MAIMAIGOON', 'KABU', 'BUTTERFLY', 'BONKERS', 'TARANZA', 'FLAMER', 'MARA', 'GRIZZO', 'RICK', 'POPOPO', 'NIGHTMARE', 'ZERO', 'HYNESS', 'MAGOLOR', 'MAGMAN', 'LEONGAR', 'BUGZZY', 'STORO', 'GOOEY', 'PITCH', 'DAROACH', 'ELLINE', 'KRACKO', 'KIRBY'],
        'Donkey Kong' : ['ZINGER', 'KROW', 'SNIDE', 'STANLEY', 'KALYPSO', 'KEROZENE', 'FUGU', 'BARBOS', 'CORDIAN', 'SKOWL', 'KASS', 'WIZPIG', 'KLUDGE', 'KLUBBA', 'BELCHA', 'ARICH', 'XYLOBONE', 'KUDGEL', 'MARIO', 'POMPY', 'BASHMASTER', 'PAULINE', 'KAOS', 'XANANAB'],
        'Dragon Quest' : ['TERRY', 'SLIME', 'ASHLYNN', 'SHELLEY', 'CELESTRIA', 'GOOBER', 'HERO', 'HEALIE', 'ERDRICK', 'STERLING', 'ROCKET', 'MORRIE', 'CETACEA', 'TRODE', 'GOOWAIN', 'CARVER', 'DWIGHT', 'LIZZIE', 'BARBARUS', 'SABER', 'HENDRIK', 'NEVAN', 'ALENA', 'RUFF', 'AUSTER', 'ANGELO', 'MERCURY', 'KIEFER', 'DRAGONLORD', 'STARKERS', 'PATTY', 'KINGSLEY', 'ERIK', 'BIANCA', 'AMOS', 'PSARO', 'CORVUS', 'MARIBEL', 'AQUILA', 'CURIE', 'JADE', 'STELLA', 'SANCHO', 'MILLY', 'VERONICA', 'ERINN', 'SELLMA', 'PAVO', 'SYLVANDO', 'IVOR', 'SPOT', 'PARRY', 'SERENA', 'LUMINARY', 'TUPPENCE', 'GREYGNARL', 'BORYA', 'AISHE', 'KIRYL', 'YANGUS'],
        'Mother' : ['NINTEN', 'HINAWA', 'POKEY', 'PIPPI', 'LLOYD', 'TEDDY', 'ANDONUTS', 'DUSTER', 'PAULA', 'KUMATORA', 'FASSAD', 'NESS', 'SALSA', 'MINCH', 'BONEY', 'PORKY', 'GIYGAS'],
        'F-Zero' : ['BERSERKER', 'PHOENIX', 'BILLY', 'KUMIKO', 'ZODA', 'PICO', 'MEGAN', 'DEATHBORN', 'FALCON', 'OCTOMAN', 'BEASTMAN', 'DRAQ', 'SPADE', 'LEON', 'NICHI'],
        'Final Fantasy' : ['DONA', 'JESSIE', 'GORKY', 'SHERA', 'YUNA', 'CHOLE', 'SHINRA', 'TREMA', 'HANA', 'ZANGAN', 'ISAARU', 'PRISCILLA', 'BUTCH', 'LIAN', 'BARTHELLO', 'ELEANOR', 'RAMUH', 'VIDINA', 'WANTZ', 'SETO', 'BENZO', 'TSENG', 'JOHNNY', 'LOGOS', 'BECLEM', 'SHUYIN', 'SKOTCH', 'RUDE', 'SHELINDA', 'TOBLI', 'WEDGE', 'LEBLANC', 'SHIVA', 'NOOJ', 'ZAON', 'STANIV', 'LUCIL', 'ORMI', 'JECHT', 'AYDE', 'CHAPPU', 'RIKKU', 'BARALAI', 'BIGGS', 'PALMER', 'ELENA', 'LENNE', 'DYNE', 'CHEKHOV', 'AMBROSIA', 'ELMA', 'PHOENIX', 'YUFFIE', 'AURON', 'VALVADOS', 'HEIDEGGER', 'IFRIT', 'YAIBAL', 'CLAUDIA', 'NOPPO', 'MUKKI', 'BUGENHAGEN', 'TEIOH', 'BROTHER', 'SCARLET', 'SEMUSI', 'ESTER', 'LULU', 'NHADALA', 'GARUDA', 'PACCE', 'TARO', 'KOTCH', 'SHAKE', 'GIPPAL', 'JENOVA', 'BARKEEP', 'TIFA', 'CLASKO', 'MAECHEN', 'HOLZOFF', 'TIDUS', 'CLOUD', 'TITAN', 'BAHAMUT', 'BUDDY', 'PAINE', 'MARODA', 'IFALNA', 'ODIN', 'YAMSKI', 'SEPHIROTH', 'VEGNAGUN', 'RENO', 'WAKKA'],
        'Super Smash Bros.' : ['YOSHI', 'CHROM', 'PALUTENA', 'JIGGLYPUFF', 'LUIGI', 'PYRA', 'RIDLEY', 'ZELDA', 'MARTH', 'PIKACHU', 'ROSALINA', 'TERRY', 'BYLETH', 'MARIO', 'ISABELLE', 'LUCAS', 'CLOUD', 'WARIO', 'LUCINA', 'SIMON', 'SONIC', 'SQUIRTLE', 'MYTHRA', 'CORRIN', 'SAMUS', 'HERO', 'LUCARIO', 'PEACH', 'SORA', 'KIRBY', 'SNAKE', 'OLIMAR', 'CHARIZARD', 'SHEIK', 'PICHU', 'KAZUYA', 'GRENINJA', 'RICHTER', 'SHULK', 'ROBIN', 'BAYONETTA', 'FALCO', 'JOKER', 'SEPHIROTH', 'VILLAGER', 'INKLING', 'STEVE', 'LINK', 'INCINEROAR', 'MEWTWO', 'DAISY', 'GANONDORF', 'IVYSAUR', 'BOWSER', 'NESS', 'WOLF', 'FALCON']
    }
    if (url.length === 1) { //If site was not loaded from a shared answer link, there won't be query params
        const keys = Object.keys(answers_obj);
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
            finishedDivs.forEach(div => {
                $(div).attr('finished', true); //Sets finished attribute to true for divs in finished array
            });
            colIndex = 0 //Resets column index
            rowIndex += 1; //Increments row index to next row
            checkAnswer(); //Calls check answer function 
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
    $(kb_keys[i]).click(() => enterInput($(kb_keys[i]).data('key')))
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
        if (guess === 1) { //First guess
            finishDialog('Flawless!', win);
        } else if (guess === rows) { //Last guess
            finishDialog('That was close!', win);
        } else if (guess === 2) {
            finishDialog('Amazing!', win);
        } else if (guess === 3) {
            finishDialog('Fantastic!', win);
        } else if (guess === 4) {
            finishDialog('Great!', win);
        } else if (guess === 5) {
            finishDialog('Good job!', win);
        } else if (guess === 5) {
            finishDialog('Well done!', win);
        } else if (guess === 6) {
            finishDialog('Got it!', win);
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