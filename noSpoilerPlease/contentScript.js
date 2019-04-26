const dictonary = [
    'AVENGERS',
    'AVENGERS END GAME',
    'AVENGERS INFINITY WAR',
    'END GAME',
    'ENDGAME',
    'TONY STARK',
    'CAPTAIN AMERICA',
    'HULK',
    'THOR',
    'BLACK WIDOW',
    'NICK FURY',
    'CAPTAIN MARVEL',
    'BLACK PANTHER',
    'DOCTOR STRANGE',
    'SPIDER MAN',
    'CAPTAIN MARVEL',
    'INFINITY WAR',
    'THANOS',
    'INFINITY GAUNTLET',
    'DEATH',
    'DIED',
    'DEAD',
    'KILL',
    'SNAP',
    'SPOILER'
];

const tags = "SPANEMBIULOLI";

const hideSpoiler = (node) => {
    let parent = null;
    if(node.parentNode != null && node.parentNode.tagName != 'BODY') {
        parent = node.parentNode;
    }

    if (node == null || node.parentNode == null) return;

    let images = parent.getElementsByTagName('img');
    images.forEach((img) => {
        img.style.webkitFilter = "blur(10px)";
    });

    let lists = parent.getElementsByTagName('li');
    lists.forEach((l) => {
        hideNode(l);
    });

    const allChild = node.parentNode.children;
    allChild.forEach((child) => {
        let type = child.tagName;
        if(tags.match(type) != null) hideNode(child);
    })
	hideNode(node);
};

const hideNode = (node) => {
    console.log(node);
	node.textContent = '[TEXT BLOCKED: SPOILER DETECTED]';
	node.style.color = 'red'
};

document.body.childNodes.forEach((cn) => {
    let isExist = null;

    if(cn.innerText) {
        isExist = dictonary.filter(value => cn.innerText.toLowerCase().includes(value.toLowerCase()));    
    }

    if(isExist && !(!cn.parentNode || cn.parentNode.nodeName === "BODY")) hideSpoiler(cn);
});