const dictonary = [
    'AVENGERS', 'Avengers', 'avengers',
    'INFINITY WAR', 'Infinity War', 'infinity war', 'infinitywar', 'INFINITYWAR', 'infinity-war', 'Infinity-War',
    'END GAME', 'end game', 'End game', 'End Game',
    'ENDGAME', 'endgame', 'Endgame',
    'TONY STARK', 'Tony Stark', 'Tony stark',
    'CAPTAIN AMERICA', 'Captain America', 'captain america',
    'HULK', 'hulk',
    'THOR', 'thor',
    'BLACK WIDOW', 'black widow', "Black Widow",
    'NICK FURY', 'nick fury', 
    'CAPTAIN MARVEL', 'captain marvel', 'Captain Marvel',
    'BLACK PANTHER', 'Black Panther', 'black panther',
    'DOCTOR STRANGE', 'Docktor Strange', 'doctor strange',
    'SPIDER MAN', 'spider man', 'Spider man',
    'THANOS', 'thanos',
    'INFINITY GAUNTLET', 'Infinity Gauntlet', 'infinity gauntlet',
    'DEATH', 'death',
    'DIED', 'died',
    'DEAD', 'dead',
    'KILL', 'kill',
    'SNAP', 'snap',
    'SPOILER', 'spoiler', 'Spoilers', 'spoilers',
    'MARVEL', 'Marvel', 'marvel'
];

const tags = "SPANEMBIULOLIDIV";

const hideSpoiler = (node) => {
    if (node == null || node.parentNode == null || node.childNodes.length == 0) return;

    node.childNodes.forEach((ch) => {
        if(ch.tagName) {
            let images = ch.getElementsByTagName('img');
            if(images.length) blurImages(images);
    
            const textNodes = deepText(ch);
            for(let txt of textNodes) hideNode(txt);
        }
    });
};

function deepText(node){
    let textNodeCollection = [];
    if(node){
        node = node.firstChild;
        while(node!= null){
            if(node.nodeType == 3 && dictonary.filter(value => -1 !== node.textContent.indexOf(value)).length) {
                textNodeCollection[textNodeCollection.length] = node;
            } else textNodeCollection = textNodeCollection.concat(deepText(node));
            node = node.nextSibling;
        }
    }
    return textNodeCollection;
}

const blurImages = (images) => {
    for(let img of images) {
        img.style.webkitFilter = "blur(10px)";
    }
};

const hideNode = (node) => {
    node.textContent = '💣 💣 ⚠ ⚠ [WARNING !! : SPOILER DETECTED] ⚠ ⚠ 💣 💣';
};

document.body.childNodes.forEach((cn) => {
    let isExist = null;
    if(cn.innerText) {
        isExist = dictonary.filter(value => -1 !== cn.innerText.indexOf(value));  
    }
    if(isExist && isExist.length != 0 && cn.parentNode && tags.match(cn.tagName) && tags.match(cn.tagName)[0] != "") {
        hideSpoiler(cn);
    }
});