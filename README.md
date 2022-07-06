## PASOS PARA TRABAJAR

Primero clonar el repositorio ``git clone https://github.com/Mercadito-pf/Mercadito-23.git ``

Traerse la ultima actualización `` git pull``

Crear la branch de la Historia que vayas a trabajar por ejemplo si vas a trabajar sobre la user Story 3 ``git checkout -b US3``

Terminado el trabajo hacer: git add . git commit -m "Hice Esto de la US3" git push --set-upstream url

Si estoy en una branch de una US3 por ejemplo y termine y quiero irme a otra branch o trabajar en otra historia hago lo siguiente
1) git checkout master
2) git pull
3) git checkout  -b  US6 (creo la US6)   sino hago git checkout US3 (voy a la que ya esta creada)
