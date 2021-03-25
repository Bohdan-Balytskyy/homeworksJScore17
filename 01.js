$(document).ready(function(){

    //Створення  масиву з майбутніми значеннями backgroundPosition в послідовності, що відображає правильне зображення картинки.
    let x2 = 0;
    let y2 = 0;
    changeline2 = 0;
    let array = [`0px 0px`];
    for (let i = 0; i < 15; i++){
        x2 += 100;
        changeline2++;
        if (changeline2 == 4) {
            changeline2 = 0;
            y2 += 100;
            x2 = 0;
        }
        array.push(`-${x2}px -${y2}px`)
    }
    // Створення масиву з рандомними значеннями backgroundPosition.
    let arrayRandom = [].concat(array)
    arrayRandom.sort(() => Math.random() - 0.5);

    // Розбиття картинки на пазли використовуючи рандомну розстановку
    $('.puzzle').each(function (index, elem) {
        $(this).css({
            backgroundPosition: `${arrayRandom[index]}`
        });
        let j = array.indexOf(`${arrayRandom[index]}`)
         $(this).addClass(`cl${j}`)
    })
    // Перевірка на правильність розміщення справа, використовуючи drop.
    for (let i = 0; i < 15; i++){
        $('.right').children().eq(i).droppable({
            accept: `.cl${i}`,
            drop: function () {
                $('.right').children().eq(i).text('1');
            }
        });
    }

    // Кнопка start, включення draggable, включення таймеру в двох місцях, всі перевірки при закінченні таймеру.
    let startID;
    let remainder;
    $('.start').click(() => { 
        $('.puzzle').draggable({
            grid: [100, 100],
            containment:'.containers'
        });
        $('.start').attr('disabled', 'true');
        $('.check').removeAttr('disabled');
        $('.start').css('backgroundColor', 'rgb(255, 182, 155)');
        $('.check').css('backgroundColor', 'rgb(255, 69, 0)')
        let datestart2 = Date.now();   
        startID = setInterval(() => {
                let datecurrent = Date.now();
                remainder = 60000 - (datecurrent - datestart2);
                let cSecond = Math.floor((remainder / 1000) % 60);
            if (cSecond < 10) cSecond = '0' + cSecond;
                if (cSecond == '00') {
                    $('.time').text(`00:00`);
                    clearTimeout(startID);
                    let res = 0;
                    for (let i = 0; i < 15; i++){
                        res += parseInt($('.right').children().eq(i).text()) 
                    }
                    if (res == 15) { 
                        $('.win').show();
                        $('.background').show();
                        $('.puzzle').draggable('destroy');
                        $('.check').attr('disabled', 'true');
                        $('.check').css('backgroundColor', 'rgb(255, 182, 155)');
                    } else {
                        $('.lost').show();
                        $('.background').show();
                        $('.check').attr('disabled', 'true');
                        $('.check').css('backgroundColor', 'rgb(255, 182, 155)');
                        $('.puzzle').draggable('destroy');
                    }
                } else {
                    $('.time').text(`00:${cSecond}`);
                    $('h2').text(`You still have time, you sure?00:${cSecond}`);
                    }
            })
    })
    // Кнопка check result
    $('.check').click(function () {
        $('.stillHaveTime').show();
        $('.background').show();
    })

    // Всі кнопки закриття
    $('.close').click(function () {
        $('.stillHaveTime').hide();
        $('.background').hide();
    })

    $('.close2').click(function () {
        $('.lost').hide();
        $('.background').hide();
    })

    $('.close3').click(function () {
        $('.win').hide();
        $('.background').hide();
    })
    
    // Кнопка check
    $('.check2').click(function () {
        $('.puzzle').draggable('destroy');
        $('.stillHaveTime').hide();
        let res = 0;
        for (let i = 0; i < 15; i++){
        res += parseInt($('.right').children().eq(i).text()) 
        }
        if (res == 15) { 
            $('.win').show();
            $('.background').show();
            $('.check').attr('disabled', 'true');
            $('.check').css('backgroundColor', 'rgb(255, 182, 155)');
            clearTimeout(startID);
        } else {
            $('.lost').show();
            $('.background').show();
            clearTimeout(startID);
            $('.check').attr('disabled', 'true');
            $('.check').css('backgroundColor', 'rgb(255, 182, 155)');
        }
    })

    // Кнопка new game
    $('.new').click(function () {
        location.reload()
     })


     // let x = 0;
    // let y = 0;
    // let changeline = 0;
    // $('.puzzle').each(function (index, elem) {
    //     $(this).css({
    //         backgroundPosition: `-${x}px -${y}px`
    //     });
    //     x += 100;
    //     changeline++;
    //     if (changeline == 4) {
    //         changeline = 0;
    //         y += 100;
    //         x = 0;
    //     }
    // })

    


})