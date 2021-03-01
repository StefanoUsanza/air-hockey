# air-hockey

Air hockey multiplayer tramite l'utilizzo di web socket(socket.io),
- grafica realizzata con la libreria P5
- server express

Gli utenti potranno giocare contro un altra persona impostando lo stesso numero di stanza generato da uno degli utenti. 
L'obbiettivo del gioco è realizzare il maggior numero di punti prima che scada il tempo; per fare punti il giocatore deve fare entrare il disco nella porta avversaria. Il giocatore controllerà i movimenti direttamente tramite il mouse.

## obbiettivi progetto

- poter accedere al gioco dal web, potendosi collegare con macchine differenti
- gestire le stanze delle partite, permettendo di organizzare partite private
- ricreare la fisica dell'air hockey con l'aiuto della libreria matter-js
- creare multeplici campi da gioco, con forme o regole differenti(tempo a disposizione, forza d'attrito)
