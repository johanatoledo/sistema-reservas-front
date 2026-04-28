import causaImg from '../assets/plates-drinks/causa.png';
import cevicheImg from '../assets/plates-drinks/ceviche.png';
import lomosaltadoImg from '../assets/plates-drinks/lomosaltado.png';
import postrelimenoImg from '../assets/plates-drinks/postrelimeño.png';
import bebidasnaturalesImg from '../assets/plates-drinks/bebidasnaturales.png';
import coctelesImg from '../assets/plates-drinks/cocteles.png';
import tonicImg from '../assets/plates-drinks/tonic.png';
import chilcanoImg from '../assets/plates-drinks/chilcano.png';
import coctelImg from '../assets/plates-drinks/coctel.png';


export const menuData = {
  'Sabores que dan La Bienvenida': [
    { name: 'OCOPA LIMEÑA', description: 'Papa Amarilla con nuestra clasica salsa huacatay,queso fresco,huevo y aceituna, con toques dulces', price: 20, photo: causaImg },
    { name: 'PAPA A LA HUANCAINA', description: 'Clásica y sabrosa, preparada con ají amarillo cremoso y queso fresco. Porción generosa para compartir', price: 20, photo: causaImg },
    { name: 'CAUSA LIMEÑA', description: 'Suave masa de papa amarilla mangueada, rellena con pollo en mayonesa casera. Acompañada con palta,aceituna,huevito de codorniz, hilos de camote crocante', price: 25, photo: causaImg },
    { name: 'ENCUENTRO ANDINO', description: 'Papas bañadas en salsa huancaína y ocopa', price: 23, photo: causaImg },
    { name: 'PAPA RELLENA', description: 'De carne picada,aceituna y huevo: empanizada al panko. Servida sobre un espejo de huancaína y ocopa, y una ensalada criolla', price: 25, photo: causaImg },
    { name: 'CHORITOS A LA CHALACA', description: 'Choritos frescos con cebolla, tomate, choclo y limón, bañados en su toque picante. Refrescantes y llenos de sabor marino.', price: 30, photo: causaImg }, 
    { name: 'CONCHAS AL FUEGO', description: 'Conchas frescas gratinadas con mantequilla, ajo y queso paria derretido. Un bocado intenso que une mar y sierra', price: 35, photo: causaImg },
    { name: 'PULPO AL OLIVO', description: 'Pulpo tierno con crema de aceitunas negras y un toque acevichado. Acompañado de galletas de soda y palta para equilibrar sabores.', price: 45, photo: causaImg },
],
  'Herencia Marina': [
    { name: 'LECHE DE TIGRE', description: 'Jugo de ceviche a base ded ají amarillo y pasta de rocoto, acompañado de chicharron de pota.', price: 25, photo: cevicheImg },
    { name: 'CEVICHE DE PESCADO', description: 'Pescado del día marinado al limón y ají limo, acompañado de cebolla en juliana, choclo y camote dulce.', price: 45, photo: cevicheImg },
    { name: 'CHICHARRON DE PESCADO', description: 'Trozo de pescado crocantes al panko, acompañado de yuca frita, sarsa criolla y tártara.', price: 40, photo: cevicheImg },
    { name: 'SPAGUETTI MAR Y TIERRA', description: 'Spaguetti con mariscos y champiñones en salsa cremosa, gratinados con parmesano.', price: 40, photo: cevicheImg },
    { name: 'CAUSA DE PESCADO CON LANGOSTINOS CROCANTES', description: 'Causa limeña de papa mangueada, acompañada de pescado con mayonesa, coronada con langostinos crocantes y chips de papas nativas, bañada en leche de tigre de rocoto y ají amarillo.', price: 40, photo: cevicheImg },  
    { name: 'CEVICHE CONCHAS NEGRAS', description: 'Conchas negras frescas marinadas en limón con cebolla, ají limo y culantro. Sabor intenso y salino, con un toque norteño y chicharrón de pota', price: 50, photo: cevicheImg },
    { name: 'CHAUFA DE MARISCOS', description: 'Mixtura de mariscos salteados al wok', price: 37, photo: cevicheImg },
    { name: 'ARROZ CON MARISCOS', description: 'Arroz cremoso, salteado con mezcla de mariscos en una deliciosa salsa criolla', price: 40, photo: cevicheImg },
    { name: 'DUO MARINO 1', description: 'Ceviche clásico + arroz con mariscos', price: 45, photo: cevicheImg },
    { name: 'DUO MARINO 2', description: ' Ceviche clásico + chaufa de mariscos', price: 45, photo: cevicheImg },
    { name: 'DUO MARINO 3', description: ' Ceviche clásico + chicharrón de pescado', price: 50, photo: cevicheImg },
  ],
  'La mesa de Limenita': [
    { name: 'SPAGHETTI A LA HUANCAINA CON LOMO SALTADO', description: 'Lomo fino, servido sobre unos cremosos spaghetti a la huancaína.', price: 55, photo: lomosaltadoImg },
    { name: 'CHAUFA CON PANCETA EN SALSA ORIENTAL', description: 'Chaufa con panceta crujiente en salsa oriental dulce, con el toque del wok que realza su sabor', price: 35, photo: lomosaltadoImg },
    { name: 'SECO NORTEÑO', description: 'Asado de tira de res acompañado con cremosos frejoles y arroz', price: 55, photo: lomosaltadoImg },
    { name: 'MILANESA LIMEÑITA A LO POBRE', description: 'Milanesa de lomo fino con arroz, papas nativas fritas, plátano y huevo frito', price: 50, photo: lomosaltadoImg },
    { name: 'CHAUFA AMAZÓNICO', description: 'Cecina, chorizo amazónico y plátano frito salteados al wok, acompañado con ají de cocona y huevito a la inglesa', price: 38, photo: lomosaltadoImg },
    { name: 'AJI DE POLLO', description: 'En un punto. Bien cremoso, acompañado con papas, huevo, aceituna y arroz', price: 35, photo: lomosaltadoImg },
    { name: 'POLLO CRIOLLO AL ESTILO LIMEÑITA', description: 'Servido con papas nativas, choclito y ensalada mixta de col, acompañado con una salsa de ocopa', price: 35, photo: lomosaltadoImg },
    { name: 'ARROZ CON PATO', description: 'Preparado al estilo del norte, con culantro fresco, ají amarillo y loche. Servido con pato jugoso y su infaltable chalaquita criolla', price: 60, photo: lomosaltadoImg },
    { name: 'LOMO SALTADO CLÁSICO', description: 'Lomo fino salteado con verduras, acompañado de papas nativas fritas y arroz', price: 50, photo: lomosaltadoImg },
  ],
  'El Broche de Oro': [ 
    { name: 'PICARONES', description: 'Tradicionales y bañados en miel chancaca.', price: 19, photo: postrelimenoImg },
    { name: 'HELADO DE TEMPORADA', description: 'Artesanal y refrescante, acompañado de trozos de brownie.', price: 20, photo: postrelimenoImg },
    { name: 'TARTA DE QUESO', description: 'Suave y cremosa, elaborada con mezcla de quesos peruanos sobre base crocante de galleta.', price: 25, photo: postrelimenoImg },
    { name: 'CORAZÓN LIMEÑITA', description: 'Corazón de chocolate relleno con suspiro de chirimoya.', price: 28, photo: postrelimenoImg },
    { name: 'CHURROS CON HELADO', description: 'Crujientes churros recien hechos, espolvoreados con azúcar y canela, servidos con una bola  de helado de tiramisú.', price: 20, photo: postrelimenoImg },
  ],
  'Guarniciones': [
    { name: 'GUARNICION 1', description: 'Arroz blanco con choclito', price: 8 },
    { name: 'GUARNICION 2', description: 'Porción de yucas.', price: 10 },
    { name: 'GUARNICION 3', description: 'Porción de papas fritas.', price: 10 },
    { name: 'GUARNICION 4', description: 'Salsa Huancaína.', price: 5 },
  ],
  'Bebidas': [
    { name: 'LIMONADA', description: 'Natural', price: 8, photo: bebidasnaturalesImg },
    { name: 'MARACUYA', description: 'Natural', price: 8, photo: bebidasnaturalesImg },
    { name: 'CHICHA MORADA', description: 'Natural', price: 10, photo: bebidasnaturalesImg },
    { name: 'AGUA MUNAY', description: 'Con o sin gas 300 ml', price: 8, photo: bebidasnaturalesImg },
    { name: 'GASEOSA COCA COLA', description: 'Helada o sin helar', price: 8, photo: bebidasnaturalesImg },
    { name: 'GASEOSA INCAKOLA', description: 'Helada o sin helar', price: 8, photo: bebidasnaturalesImg },
    { name: 'LIMONADA AFRUTADA', description: 'Natural con tres sabores a elegir:Fresa-Menta-Hierba Luisa', price: 10, photo: bebidasnaturalesImg },
    
    
  ],
  'Infusiones': [
    { name: 'FRUTOS ROJOS', description: 'Infusión de frutos rojos', price: 10 },
    { name: 'INFUSIONES LA FIDELIA', description: 'Diferentes sabores', price: 10 },
  ],
  'Cocteles Limeños': [
    { name: 'SMOKED SOUR', description: 'Pisco Pago de los Frailes by Portón macerado en canela, agave de los Andes, licor de cacao, lima limón, piña grillada y clara', price: 39, photo: coctelesImg },
    { name: 'CHILCANO LIMEÑO', description: 'Pisco Pago de los Frailes by Portón, estrujado en cáscaras de lima, aguaymanto y ginger ale', price: 29, photo: tonicImg },
    { name: 'PISCO PUNCH SPICED', description: 'Pisco Pago de los Frailes by Portón, especias, piña y albahaca.', price: 33, photo: chilcanoImg },
    { name: 'TROPICAL TEA PUNCH', description: 'Pisco Pago de los Frailes by Portón, té frío, maracumango', price: 39, photo: coctelImg },
    { name: 'NEGRONI DARK', description: 'Ron Bacardi añejo, Campari, Cinzano 1757 y Pedro Ximénez oloroso.', price: 39, photo: bebidasnaturalesImg },
    { name: 'MARGARITA MILAGROSA', description: 'Tequila Espolón, kiwi, leche de coco, triple sec y blueberries', price: 39, photo: tonicImg },
  ],
  'Cocteles Clasicos': [
    { name: 'APEROL SPRITZ', description: 'Aperol, Cinzano prosecco y soda.', price: 29, photo: bebidasnaturalesImg },
    { name: 'SERVULO', description: 'Aperol, Pisco Portón aromático, licor de cherry y Cinzano Blanco.', price: 29, photo: coctelesImg },
    { name: 'CAPITAN', description: '', price: 29, photo: chilcanoImg },
    { name: 'ALGARROBINA', description: '', price: 25, photo: bebidasnaturalesImg },
    { name: 'PISCO SOUR', description: '', price: 28, photo: coctelImg },
    { name: 'CHILCANO CLASICO', description: '', price: 22, photo: chilcanoImg },
    { name: 'CHILCANO DE MARACUYA', description: '', price: 25, photo: coctelesImg },
    { name: 'CUBA LIBRE', description: '', price: 24, photo: bebidasnaturalesImg },
    { name: 'PIÑA COLADA', description: '', price: 29, photo: chilcanoImg },
      
  ],
  'Mocktails (sin alcohol)': [
    { name: 'ROJO PASION', description: 'Arándanos, camu camu, lima limón, agua tónica y clara de huevo.', price: 25, photo: chilcanoImg },
    { name: 'ROJO PASION CON GIN', description: 'Arándanos, camu camu, lima limón, agua tónica,clara de huevo Y gin macerado en airampo y té. ', price: 35, photo: coctelesImg },
    { name: 'DELICIOSA VIRGEN', description: 'Kiwi, elderflower, lima limón y tónica blossom.', price: 25, photo: tonicImg },
  ],
  'Calientitos': [
    { name: 'TE PITEADO PALAIS', description: 'Whisky Johnnie Walker Red Label, piña grillada, frutos rojos y concentrado de de té de rosas y jazmín.', price: 38, photo: chilcanoImg },

  ],
  'Gins & Tonics (Perfect serve)': [
    { name: 'BOMBAY SAPPHIRE TONIC', description: 'Servido con una Tónica dry perfume de naranja y limón', price: 29, photo: coctelesImg },
    { name: 'BOMBAY BRAMBLE TONIC', description: 'Servido con una Tónica dry, arándanos y fresas.', price: 30, photo: coctelImg },
    { name: 'HENDRICKS TONIC', description: 'Servido con una Tónica dry y pepino kiuri.', price: 39, photo: chilcanoImg },
    { name: 'TANQUERAY LONDON DRY TONIC', description: 'Servido con una Tónica dry y rodaja de limón', price: 26, photo: tonicImg },
    { name: 'AIRAMPO TEA TONIC', description: 'Gin macerado con airampo y té de frutos rojos, servido con una tónica blossom y frutos del bosque.', price: 29, photo: bebidasnaturalesImg },
  ],
};
