const root = document.getElementById('root');

let imgs = '';
for (let i = 1; i <= 19; ++i) {
    imgs += `<div class="layout">                
                <img src="img/photoStore/${i}.webp">  
            </div>`;
}
root.innerHTML = imgs;

const layouts = document.getElementsByClassName('layout');
const hearts = document.getElementsByClassName('heart');

const close = (element) => {
    element.remove();
    enableScrolling();
}

const disableScrolling = () => {
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

const enableScrolling = () => {
    window.onscroll=function(){};
}

const writeComment = (text) => {
    const newComment = document.createElement('li');
    newComment.classList.add('comment');
    const user = document.createElement('span');
    user.textContent = "User: ";
    newComment.append(user);
    newComment.append(text);
    return newComment;
}

const heartListener = (hearts) => {
    [].forEach.call(hearts, (heart) => {
        heart.addEventListener('click', (e) => {        
            heart.classList.toggle('like');
        });
    });
};

[].forEach.call(layouts, (layout) => {
    layout.addEventListener('click', (e) => {
        if (e.target === layout || e.target === layout.firstElementChild) {            
            disableScrolling();
            const target = layout.cloneNode(true);
            const heart = document.createElement('img');
            heart.setAttribute('src', 'img/icons/heart.svg');
            heart.classList.add('heart');
            target.append(heart);
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            overlay.addEventListener('click', (e) => {
                if (e.target === e.currentTarget) {
                    close(e.currentTarget);
                }
            })
            //Создаем lightbox
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');        
            //Это закрывашка
            const closeLB = document.createElement('span');
            closeLB.classList.add('close');
            closeLB.textContent = 'x';
            closeLB.addEventListener('click', (e) => {
                close(overlay);
            })
            //Создаем строку для написания комментария
            const commentLine = document.createElement('form');
            commentLine.classList.add('commentLine');
            commentLine.addEventListener('submit', (e) => {
                e.preventDefault();
                const text = e.target.elements[0].value;
                if(text) {
                    document.querySelector('.comments').append(writeComment(text));
                    comment.value = "";
                }            
            });


            const comment = document.createElement('input');
            comment.setAttribute('type', 'text');
            comment.setAttribute('name', 'comment');
            comment.setAttribute('placeholder', 'Текст комментария');
            comment.classList.add('newComment');
            commentLine.append(comment);

            const sendComment = document.createElement('input');
            sendComment.setAttribute('type', 'submit');        
            sendComment.value = 'Отправить';
            sendComment.classList.add('sendComment');

            commentLine.append(sendComment);

            //Создаем контейнер для комментариев
            const comments = document.createElement('ul');
            comments.classList.add('comments');
            heartListener(target.getElementsByClassName('heart'));
            //Компонуем lightbox
            lightbox.append(closeLB);
            lightbox.append(target);
            lightbox.append(commentLine);
            lightbox.append(comments);
            

            overlay.append(lightbox);
            root.append(overlay);
        }
    });
});