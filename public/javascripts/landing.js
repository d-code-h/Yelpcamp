var i = 0;

function changeBg(){
    const background = [
        "url(https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNhbXBncm91bmRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fGNhbXBncm91bmRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhbXBncm91bmRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDN8fGNhbXBncm91bmRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1571687949921-1306bfb24b72?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDV8fGNhbXBncm91bmRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fGNhbXBncm91bmRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1568872321643-14b2408cd5f4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Njd8fGNhbXBncm91bmRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1499363536502-87642509e31b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzJ8fGNhbXBncm91bmRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODB8fGNhbXBncm91bmRzfGVufDB8fDB8&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzV8fGNhbXBncm91bmRzfGVufDB8fDB8&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1521255450884-b3e8e92cd615?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODV8fGNhbXBncm91bmRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
        "url(https://images.unsplash.com/photo-1525811902-f2342640856e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTB8fGNhbXBncm91bmRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
    ];
    
    if (i === background.length) i = 0;
    $("body").css("backgroundImage", background[i]);
    i++;
}

setInterval(changeBg, 7000);