
import causaWebp from '/assets/plates-drinks/causa.webp';
import cevicheWebp from '/assets/plates-drinks/ceviche.webp';
import lomosaltadoWebp from '/assets/plates-drinks/lomosaltado.webp';
import postrelimenoWebp from '/assets/plates-drinks/postres-limeña.webp';
import picaronesWepb from '/assets/plates-drinks/picarones-limeños.webp';
import pulpOlivoWepb from '/assets/plates-drinks/pulpo-al-olivo.webp';
import spaguettiLomoSaltadoWepb from '/assets/plates-drinks/spaguetti-lomosaltado.webp';
import bebidasnaturalesWebp from '/assets/plates-drinks/bebidasnaturales.webp';
import coctelesWebp from '/assets/plates-drinks/cocteles.webp';
import tonicWebp from '/assets/plates-drinks/tonic.webp';
import chilcanoWebp from '/assets/plates-drinks/chilcano.webp';
import coctelWebp from '/assets/plates-drinks/coctel.webp';
import piscosourWepb from '/assets/plates-drinks/pisco-sour.webp';
import churrosWepb from '/assets/plates-drinks/churros-con-helado.webp';
import heladoWepb from '/assets/plates-drinks/helado-de-temporada.webp';
import tartaquesoWebp from '/assets/plates-drinks/tarta-de-queso.webp';
import corazonWebp from '/assets/plates-drinks/corazon-casona.webp';



const IMAGES = {
  causa: {  webp: causaWebp },
  ceviche: { webp: cevicheWebp },
  lomosaltado: { webp: lomosaltadoWebp },
  postrelimeno: { webp: postrelimenoWebp },
  picarones: { webp: picaronesWepb },
  pulpOlivo: { webp: pulpOlivoWepb },
  spaguettiLomoSaltado: { webp: spaguettiLomoSaltadoWepb },
  piscosour: { webp: piscosourWepb },
  bebidasnaturales: { webp: bebidasnaturalesWebp },
  cocteles: { webp: coctelesWebp },
  tonic: { webp: tonicWebp },
  chilcano: { webp: chilcanoWebp },
  coctel: { webp: coctelWebp },
  churros: { webp: churrosWepb },
  helado: { webp: heladoWepb },
  tartaqueso: { webp: tartaquesoWebp },
  corazon: { webp: corazonWebp },
};



export const menuData = {
   'Postres': [ 
    { name: 'PICARONES', description: 'Tradicionales y bañados en miel chancaca.', price: 19, photo: IMAGES.picarones },
    { name: 'HELADO DE TEMPORADA', description: 'Artesanal y refrescante, acompañado de trozos de brownie.', price: 20, photo: IMAGES.helado },
    { name: 'TARTA DE QUESO', description: 'Suave y cremosa, elaborada con mezcla de quesos peruanos sobre base crocante de galleta.', price: 25, photo: IMAGES.tartaqueso },
    { name: 'CORAZÓN El SABOR DE LA CASONA', description: 'Corazón de chocolate relleno con suspiro de chirimoya.', price: 28, photo: IMAGES.corazon },
    { name: 'CHURROS CON HELADO', description: 'Crujientes churros recien hechos, espolvoreados con azúcar y canela, servidos con una bola  de helado de tiramisú.', price: 20, photo: IMAGES.churros },
  ],
  'Entradas': [
    { name: 'OCOPA LIMEÑA', description: 'Papa Amarilla con nuestra clasica salsa huacatay,queso fresco,huevo y aceituna, con toques dulces', price: 20, photo: IMAGES.causa },
    { name: 'PAPA A LA HUANCAINA', description: 'Clásica y sabrosa, preparada con ají amarillo cremoso y queso fresco. Porción generosa para compartir', price: 20, photo: IMAGES.causa },
    { name: 'CAUSA LIMEÑA', description: 'Suave masa de papa amarilla mangueada, rellena con pollo en mayonesa casera. Acompañada con palta,aceituna,huevito de codorniz, hilos de camote crocante', price: 25, photo: IMAGES.causa },
    { name: 'ENCUENTRO ANDINO', description: 'Papas bañadas en salsa huancaína y ocopa', price: 23, photo: IMAGES.causa },
    { name: 'PAPA RELLENA', description: 'De carne picada,aceituna y huevo: empanizada al panko. Servida sobre un espejo de huancaína y ocopa, y una ensalada criolla', price: 25, photo: IMAGES.causa },
    { name: 'CHORITOS A LA CHALACA', description: 'Choritos frescos con cebolla, tomate, choclo y limón, bañados en su toque picante. Refrescantes y llenos de sabor marino.', price: 30, photo: IMAGES.causa }, 
    { name: 'CONCHAS AL FUEGO', description: 'Conchas frescas gratinadas con mantequilla, ajo y queso paria derretido. Un bocado intenso que une mar y sierra', price: 35, photo: IMAGES.causa },
    { name: 'PULPO AL OLIVO', description: 'Pulpo tierno con crema de aceitunas negras y un toque acevichado. Acompañado de galletas de soda y palta para equilibrar sabores.', price: 45, photo: IMAGES.pulpOlivo },
],
  'Herencia Marina': [
    { name: 'LECHE DE TIGRE', description: 'Jugo de ceviche a base ded ají amarillo y pasta de rocoto, acompañado de chicharron de pota.', price: 25, photo: IMAGES.ceviche },
    { name: 'CEVICHE DE PESCADO', description: 'Pescado del día marinado al limón y ají limo, acompañado de cebolla en juliana, choclo y camote dulce.', price: 45, photo: IMAGES.ceviche },
    { name: 'CHICHARRON DE PESCADO', description: 'Trozo de pescado crocantes al panko, acompañado de yuca frita, sarsa criolla y tártara.', price: 40, photo: IMAGES.ceviche },
    { name: 'SPAGUETTI MAR Y TIERRA', description: 'Spaguetti con mariscos y champiñones en salsa cremosa, gratinados con parmesano.', price: 40, photo: IMAGES.ceviche },
    { name: 'CAUSA DE PESCADO CON LANGOSTINOS CROCANTES', description: 'Causa limeña de papa mangueada, acompañada de pescado con mayonesa, coronada con langostinos crocantes y chips de papas nativas, bañada en leche de tigre de rocoto y ají amarillo.', price: 40, photo: IMAGES.ceviche },  
    { name: 'CEVICHE CONCHAS NEGRAS', description: 'Conchas negras frescas marinadas en limón con cebolla, ají limo y culantro. Sabor intenso y salino, con un toque norteño y chicharrón de pota', price: 50, photo: IMAGES.ceviche },
    { name: 'CHAUFA DE MARISCOS', description: 'Mixtura de mariscos salteados al wok', price: 37, photo: IMAGES.ceviche },
    { name: 'ARROZ CON MARISCOS', description: 'Arroz cremoso, salteado con mezcla de mariscos en una deliciosa salsa criolla', price: 40, photo: IMAGES.ceviche },
    { name: 'DUO MARINO 1', description: 'Ceviche clásico + arroz con mariscos', price: 45, photo: IMAGES.ceviche },
    { name: 'DUO MARINO 2', description: ' Ceviche clásico + chaufa de mariscos', price: 45, photo: IMAGES.ceviche },
    { name: 'DUO MARINO 3', description: ' Ceviche clásico + chicharrón de pescado', price: 50, photo: IMAGES.ceviche},
  ],
  'Platos Principales': [
    { name: 'SPAGHETTI A LA HUANCAINA CON LOMO SALTADO', description: 'Lomo fino, servido sobre unos cremosos spaghetti a la huancaína.', price: 55, photo: IMAGES.spaguettiLomoSaltado },
    { name: 'CHAUFA CON PANCETA EN SALSA ORIENTAL', description: 'Chaufa con panceta crujiente en salsa oriental dulce, con el toque del wok que realza su sabor', price: 35, photo: IMAGES.lomosaltado },
    { name: 'SECO NORTEÑO', description: 'Asado de tira de res acompañado con cremosos frejoles y arroz', price: 55, photo: IMAGES.lomosaltado },
    { name: 'MILANESA LIMEÑITA A LO POBRE', description: 'Milanesa de lomo fino con arroz, papas nativas fritas, plátano y huevo frito', price: 50, photo: IMAGES.lomosaltado },
    { name: 'CHAUFA AMAZÓNICO', description: 'Cecina, chorizo amazónico y plátano frito salteados al wok, acompañado con ají de cocona y huevito a la inglesa', price: 38, photo: IMAGES.lomosaltado },
    { name: 'AJI DE POLLO', description: 'En un punto. Bien cremoso, acompañado con papas, huevo, aceituna y arroz', price: 35, photo: IMAGES.lomosaltado },
    { name: 'POLLO CRIOLLO AL ESTILO LIMEÑITA', description: 'Servido con papas nativas, choclito y ensalada mixta de col, acompañado con una salsa de ocopa', price: 35, photo: IMAGES.lomosaltado },
    { name: 'ARROZ CON PATO', description: 'Preparado al estilo del norte, con culantro fresco, ají amarillo y loche. Servido con pato jugoso y su infaltable chalaquita criolla', price: 60, photo: IMAGES.lomosaltado },
    { name: 'LOMO SALTADO CLÁSICO', description: 'Lomo fino salteado con verduras, acompañado de papas nativas fritas y arroz', price: 50, photo: IMAGES.lomosaltado },
  ],
 
  'Guarniciones': [
    { name: 'GUARNICION 1', description: 'Arroz blanco con choclito', price: 8 },
    { name: 'GUARNICION 2', description: 'Porción de yucas.', price: 10 },
    { name: 'GUARNICION 3', description: 'Porción de papas fritas.', price: 10 },
    { name: 'GUARNICION 4', description: 'Salsa Huancaína.', price: 5 },
  ],
  'Bebidas': [
    { name: 'LIMONADA', description: 'Natural', price: 8, photo: IMAGES.bebidasnaturales },
    { name: 'LIMONADA ', description: 'Fronzen', price: 12, photo:  IMAGES.bebidasnaturales },
    { name: 'MARACUYA', description: 'Natural', price: 8, photo:  IMAGES.bebidasnaturales },
    { name: 'MARACUYA', description: 'Fronzen', price: 12, photo:  IMAGES.bebidasnaturales },
    { name: 'CHICHA MORADA', description: 'Natural', price: 10, photo:  IMAGES.bebidasnaturales },
    { name: 'CHICHA MORADA', description: 'Fronzen', price: 15, photo:  IMAGES.bebidasnaturales },
    { name: 'AGUA MUNAY', description: 'Con o sin gas 300 ml', price: 8, photo:  IMAGES.bebidasnaturales },
    { name: 'AGUA MUNAY', description: 'Con o sin gas 500 ml', price: 10, photo:  IMAGES.bebidasnaturales },
    { name: 'GASEOSA COCA COLA', description: 'Helada o sin helar', price: 8, photo:  IMAGES.bebidasnaturales },
    { name: 'GASEOSA INCAKOLA', description: 'Helada o sin helar', price: 8, photo:  IMAGES.bebidasnaturales },
    { name: 'LIMONADA AFRUTADA', description: 'Natural con tres sabores a elegir:Fresa-Menta-Hierba Luisa', price: 10, photo:  IMAGES.bebidasnaturales },
    { name: 'LIMONADA AFRUTADA', description: 'Fronzen con tres sabores a elegir:Fresa-Menta-Hierba Luisa', price: 10, photo:  IMAGES.bebidasnaturales },
    
  ],
  'Infusiones': [
    { name: 'FRUTOS ROJOS', description: 'Infusión de frutos rojos', price: 10 },
    { name: 'INFUSIONES LA FIDELIA', description: 'Diferentes sabores', price: 10 },
  ],
  'Cocteles Limeños': [
    { name: 'SMOKED SOUR', description: 'Pisco Pago de los Frailes by Portón macerado en canela, agave de los Andes, licor de cacao, lima limón, piña grillada y clara', price: 39, photo: IMAGES.cocteles },
    { name: 'CHILCANO LIMEÑO', description: 'Pisco Pago de los Frailes by Portón, estrujado en cáscaras de lima, aguaymanto y ginger ale', price: 29, photo: IMAGES.tonic },
    { name: 'PISCO PUNCH SPICED', description: 'Pisco Pago de los Frailes by Portón, especias, piña y albahaca.', price: 33, photo: IMAGES.chilcano },
    { name: 'TROPICAL TEA PUNCH', description: 'Pisco Pago de los Frailes by Portón, té frío, maracumango', price: 39, photo: IMAGES.tonic },
    { name: 'NEGRONI DARK', description: 'Ron Bacardi añejo, Campari, Cinzano 1757 y Pedro Ximénez oloroso.', price: 39, photo: IMAGES.cocteles },
    { name: 'MARGARITA MILAGROSA', description: 'Tequila Espolón, kiwi, leche de coco, triple sec y blueberries', price: 39, photo: IMAGES.chilcano },
  ],
  'Cocteles Clasicos': [
    { name: 'APEROL SPRITZ', description: 'Aperol, Cinzano prosecco y soda.', price: 29, photo: IMAGES.cocteles },
    { name: 'SERVULO', description: 'Aperol, Pisco Portón aromático, licor de cherry y Cinzano Blanco.', price: 29, photo: IMAGES.tonic },
    { name: 'CAPITAN', description: '', price: 29, photo: IMAGES.chilcano },
    { name: 'ALGARROBINA', description: '', price: 25, photo: IMAGES.coctel},
    { name: 'PISCO SOUR', description: '', price: 28, photo: IMAGES.piscosour },
    { name: 'CHILCANO CLASICO', description: '', price: 22, photo: IMAGES.bebidasnaturales },
    { name: 'CHILCANO DE MARACUYA', description: '', price: 25, photo: IMAGES.chilcano},
    { name: 'CUBA LIBRE', description: '', price: 24, photo: IMAGES.cocteles },
    { name: 'PIÑA COLADA', description: '', price: 29, photo: IMAGES.tonic },
      
  ],
  'Mocktails (sin alcohol)': [
    { name: 'ROJO PASION', description: 'Arándanos, camu camu, lima limón, agua tónica y clara de huevo.', price: 25, photo: IMAGES.chilcano },
    { name: 'ROJO PASION CON GIN', description: 'Arándanos, camu camu, lima limón, agua tónica,clara de huevo Y gin macerado en airampo y té. ', price: 35, photo: IMAGES.bebidasnaturales },
    { name: 'DELICIOSA VIRGEN', description: 'Kiwi, elderflower, lima limón y tónica blossom.', price: 25, photo: IMAGES.tonic },
  ],
  'Calientitos': [
    { name: 'TE PITEADO PALAIS', description: 'Whisky Johnnie Walker Red Label, piña grillada, frutos rojos y concentrado de de té de rosas y jazmín.', price: 38, photo: IMAGES.coctel },

  ],
  'Gins & Tonics (Perfect serve)': [
    { name: 'BOMBAY SAPPHIRE TONIC', description: 'Servido con una Tónica dry perfume de naranja y limón', price: 29, photo: IMAGES.coctel },
    { name: 'BOMBAY BRAMBLE TONIC', description: 'Servido con una Tónica dry, arándanos y fresas.', price: 30, photo: IMAGES.chilcano },
    { name: 'HENDRICKS TONIC', description: 'Servido con una Tónica dry y pepino kiuri.', price: 39, photo: IMAGES.tonic },
    { name: 'TANQUERAY LONDON DRY TONIC', description: 'Servido con una Tónica dry y rodaja de limón', price: 26, photo: IMAGES.bebidasnaturales },
    { name: 'AIRAMPO TEA TONIC', description: 'Gin macerado con airampo y té de frutos rojos, servido con una tónica blossom y frutos del bosque.', price: 29, photo: IMAGES.cocteles },
  ],
};
