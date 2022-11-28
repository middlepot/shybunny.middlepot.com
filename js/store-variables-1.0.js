//adds white overlay
var whiteoverlay = document.createElement('div');
whiteoverlay.id = 'whiteoverlay';
whiteoverlay.style.position = 'fixed';
whiteoverlay.style.display = 'flex';
whiteoverlay.style.justifyContent = 'center';
whiteoverlay.style.alignItems = 'center';
whiteoverlay.style.width = '100%';
whiteoverlay.style.height = '100%';
whiteoverlay.style.top = '0';
whiteoverlay.style.left = '0';
whiteoverlay.style.background = '#fff';
whiteoverlay.style.zIndex = '999999';
if(!$('#whiteoverlay').length){
    $(whiteoverlay).insertAfter('head');
}

var environment = 'production';
var api_path = 'http://localhost:3005/v1';
var paypalKey = 'Aet2dryKVFoHrAaCgtDpJsADhYgbzWZX6AR8B-0ITrVl7FM0U_6u2-LnxqsBqU0wvnDOHgjgkNo7Pmz3';
var mercadopagoKey = 'TEST-7d87dc06-5d2f-4d62-8534-622f2052f806';
if(environment !== 'development'){
    api_path = 'https://api.middlepot.com/v1';
    paypalKey = 'AaJ_j9vf-Z4jI8C7WrbP81WAsXm7HaMGEtFjvostBsdRBze1xJv3DbSX7DasVPtYVar3urkgUhiX3_2Z';
    mercadopagoKey = 'APP_USR-6039baf3-61e2-45ee-bc85-b6c9e0cba763';
}
var store_info = {};
var critters = {};
var categories = {};
var cart_items = [];
var currentCritter = '';
var currentVariation = 0;
var currentAccessory = -1;
var currentCategory = '';
var currentChokerVariation = 0;
var currentChokerAccessory = -1;
var currentHeadbandVariation = 0;
var currentHeadbandAccessory = -1;
var currentHairclipVariation = 0;
var currentHairclipAccessory = -1;
var loadingSomething = false;
//base images
var chokers = ['img/chokerbase1.png', 'img/chokerbase2.png', 'img/chokerbase3.png'];
var headbands = ['img/headbandbase1.png', 'img/headbandbase2.png', 'img/headbandbase3.png', 'img/headbandbase4.png'];
var hairclips = ['img/hairclipbase1.png', 'img/hairclipbase2.png', 'img/hairclipbase3.png', 'img/hairclipbase4.png'];
async function initStore(){
    loadingSomething = true;
    var info = await fetch(api_path+'/items/info', {method: 'GET'});
    store_info = await info.json();
    categories = store_info.items_categories;

    //critters
    var base_path = 'img/critters';
    critters = {
        BUNNY: {
            NAME: 'bunny',
            BODY: base_path+'/bunny/bunny_body.png',
            HEAD: base_path+'/bunny/bunny_head.png',
            ARMS: [base_path+'/bunny/bunny_pose1.png', base_path+'/bunny/bunny_pose2.png', base_path+'/bunny/bunny_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/bunny/bunny_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc12_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc13_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc14_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/bunny/bunny_acc15_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/bunny/bunny_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/bunny/bunny_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/bunny/bunny_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/bunny/bunny_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/bunny/bunny_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/bunny/bunny_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
        CHICK: {
            NAME: 'chick',
            BODY: base_path+'/chick/chick_body.png',
            HEAD: base_path+'/chick/chick_head.png',
            ARMS: [base_path+'/chick/chick_pose1.png', base_path+'/chick/chick_pose2.png', base_path+'/chick/chick_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/chick/chick_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc12_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc13_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc14_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/chick/chick_acc15_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/chick/chick_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/chick/chick_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/chick/chick_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/chick/chick_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/chick/chick_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/chick/chick_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
        COW: {
            NAME: 'cow',
            BODY: base_path+'/cow/cow_body.png',
            HEAD: base_path+'/cow/cow_head.png',
            ARMS: [base_path+'/cow/cow_pose1.png', base_path+'/cow/cow_pose2.png', base_path+'/cow/cow_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/cow/cow_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc12_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/cow/cow_acc13_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/cow/cow_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/cow/cow_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/cow/cow_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/cow/cow_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/cow/cow_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/cow/cow_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
        DUCK: {
            NAME: 'duck',
            BODY: base_path+'/duck/duck_body.png',
            HEAD: base_path+'/duck/duck_head.png',
            ARMS: [base_path+'/duck/duck_pose1.png', base_path+'/duck/duck_pose2.png', base_path+'/duck/duck_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/duck/duck_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc12_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc13_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc14_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/duck/duck_acc15_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/duck/duck_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/duck/duck_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/duck/duck_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/duck/duck_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/duck/duck_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/duck/duck_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
        FROG: {
            NAME: 'frog',
            BODY: base_path+'/frog/frog_body.png',
            HEAD: base_path+'/frog/frog_head.png',
            ARMS: [base_path+'/frog/frog_pose1.png', base_path+'/frog/frog_pose2.png', base_path+'/frog/frog_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/frog/frog_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/frog/frog_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/frog/frog_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/frog/frog_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/frog/frog_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/frog/frog_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/frog/frog_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/frog/frog_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/frog/frog_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/frog/frog_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/frog/frog_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/frog/frog_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/frog/frog_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/frog/frog_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/frog/frog_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/frog/frog_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/frog/frog_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
        KITTY: {
            NAME: 'kitty',
            BODY: base_path+'/kitty/kitty_body.png',
            HEAD: base_path+'/kitty/kitty_head.png',
            ARMS: [base_path+'/kitty/kitty_pose1.png', base_path+'/kitty/kitty_pose2.png', base_path+'/kitty/kitty_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/kitty/kitty_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc12_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc13_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc14_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/kitty/kitty_acc15_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/kitty/kitty_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/kitty/kitty_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/kitty/kitty_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/kitty/kitty_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/kitty/kitty_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/kitty/kitty_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
        LAMB: {
            NAME: 'lamb',
            BODY: base_path+'/lamb/lamb_body.png',
            HEAD: base_path+'/lamb/lamb_head.png',
            ARMS: [base_path+'/lamb/lamb_pose1.png', base_path+'/lamb/lamb_pose2.png', base_path+'/lamb/lamb_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/lamb/lamb_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc12_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/lamb/lamb_acc13_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/lamb/lamb_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/lamb/lamb_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/lamb/lamb_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/lamb/lamb_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/lamb/lamb_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/lamb/lamb_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
        PUPPY: {
            NAME: 'puppy',
            BODY: base_path+'/puppy/puppy_body.png',
            HEAD: base_path+'/puppy/puppy_head.png',
            ARMS: [base_path+'/puppy/puppy_pose1.png', base_path+'/puppy/puppy_pose2.png', base_path+'/puppy/puppy_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/puppy/puppy_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc12_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc13_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc14_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy/puppy_acc15_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/puppy/puppy_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/puppy/puppy_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/puppy/puppy_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/puppy/puppy_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/puppy/puppy_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/puppy/puppy_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
        PUPPY2: {
            NAME: 'puppy2',
            BODY: base_path+'/puppy2/puppy2_body.png',
            HEAD: base_path+'/puppy2/puppy2_head.png',
            ARMS: [base_path+'/puppy2/puppy2_pose1.png', base_path+'/puppy2/puppy2_pose2.png', base_path+'/puppy2/puppy2_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/puppy2/puppy2_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc12_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc13_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc14_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc15_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/puppy2/puppy2_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/puppy2/puppy2_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/puppy2/puppy2_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/puppy2/puppy2_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
        TEDDY: {
            NAME: 'teddy',
            BODY: base_path+'/teddy/teddy_body.png',
            HEAD: base_path+'/teddy/teddy_head.png',
            ARMS: [base_path+'/teddy/teddy_pose1.png', base_path+'/teddy/teddy_pose2.png', base_path+'/teddy/teddy_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/teddy/teddy_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc12_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc13_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc14_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy/teddy_acc15_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/teddy/teddy_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/teddy/teddy_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/teddy/teddy_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/teddy/teddy_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/teddy/teddy_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/teddy/teddy_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
        TEDDY2: {
            NAME: 'teddy2',
            BODY: base_path+'/teddy2/teddy2_body.png',
            HEAD: base_path+'/teddy2/teddy2_head.png',
            ARMS: [base_path+'/teddy2/teddy2_pose1.png', base_path+'/teddy2/teddy2_pose2.png', base_path+'/teddy2/teddy2_pose3.png'],
            ACCESSORIES: [{
                IMG: base_path+'/teddy2/teddy2_acc1.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc2_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc3_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc4_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc5_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc6_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc7_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc8_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc9_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc10_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc11_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc12_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc13_w.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc14_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc15_p.png',
                POSX: 0,
                POSY: 0,
                BEHIND_ARMS: [false, false, true]
            }],
            CHOKER_ACCESSORIES:[{
                IMG: base_path+'/teddy2/teddy2_acc1_choker_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc2_choker_p.png',
                POSX: 0,
                POSY: 0
            }],
            HEADBAND_ACCESSORIES:[{
                IMG: base_path+'/teddy2/teddy2_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }],
            HAIRCLIP_ACCESSORIES:[{
                IMG: base_path+'/teddy2/teddy2_acc1_hairclip_w.png',
                POSX: 0,
                POSY: 0
            },
            {
                IMG: base_path+'/teddy2/teddy2_acc1_hairclip_p.png',
                POSX: 0,
                POSY: 0
            }]
        },
    }
    
    //inject positions
    categories.STUFFIE.PREVIEW = {
        HEIGHT: 300, //width is auto
        TOP: 150,
        LEFT: 500,
        RULER:{
            TOP: 150,
            LEFT: 360
        },
        BUTTONS:{
            VARIATIONS:{
                DISPLAY: 'block',
                POSX: 580,
                POSY: 300
            },
            ACCESSORIES:{
                DISPLAY: 'block',
                POSX: 580,
                POSY: 205
            }
        }
    }
    categories.CHARM.PREVIEW = {
        HEIGHT: 225, //width is auto
        TOP: 75, //relative to base
        LEFT: 85, //relative to base
        RULER:{
            TOP: 225,
            LEFT: 400
        },
        BASE:{
            TOP: 160,
            LEFT: 500,
            HEIGHT: 100
        },
        BUTTONS:{
            VARIATIONS:{
                DISPLAY: 'block',
                POSX: 580,
                POSY: 300
            },
            ACCESSORIES:{
                DISPLAY: 'block',
                POSX: 580,
                POSY: 205
            }
        }
    }
    categories.CHOKER.PREVIEW = {
        HEIGHT: 85, //width is auto
        TOP: 45, //relative to base
        LEFT: 245, //relative to base
        RULER:{
            TOP: 265,
            LEFT: 425
        },
        BASE:{
            TOP: 240,
            LEFT: 470,
            WIDTH: 240
        },
        BUTTONS:{
            VARIATIONS:{
                DISPLAY: 'block',
                POSX: 430,
                POSY: 190
            },
            ACCESSORIES:{
                DISPLAY: 'block',
                POSX: 530,
                POSY: 190
            }
        }
    }
    categories.PIN.PREVIEW = {
        HEIGHT: 117, //width is auto
        TOP: 240,
        LEFT: 500,
        RULER:{
            TOP: 240,
            LEFT: 380
        },
        BUTTONS:{
            VARIATIONS:{
                DISPLAY: 'none',
                POSX: 580,
                POSY: 300
            },
            ACCESSORIES:{
                DISPLAY: 'block',
                POSX: 560,
                POSY: 190
            }
        }
    }
    categories.EARRING.PREVIEW = {
        HEIGHT: 90, //width is auto
        TOP: 60, //relative to base
        LEFT: 55, //relative to base
        RULER:{
            TOP: 307,
            LEFT: 385
        },
        BASE:{
            TOP: 250,
            LEFT: 490,
            HEIGHT: 75
        },
        BUTTONS:{
            VARIATIONS:{
                DISPLAY: 'none',
                POSX: 580,
                POSY: 300
            },
            ACCESSORIES:{
                DISPLAY: 'block',
                POSX: 560,
                POSY: 190
            }
        }
    }
    categories.HEADBAND.PREVIEW = {
        HEIGHT: 80, //width is auto
        TOP: 70, //relative to base
        LEFT: 140, //relative to base,
        RULER:{
            TOP: 310,
            LEFT: 530
        },
        BASE:{
            TOP: 240,
            LEFT: 420,
            WIDTH: 240
        },
        BUTTONS:{
            VARIATIONS:{
                DISPLAY: 'block',
                POSX: 430,
                POSY: 190
            },
            ACCESSORIES:{
                DISPLAY: 'block',
                POSX: 530,
                POSY: 190
            }
        }
    }
    categories.HAIRCLIP.PREVIEW = {
        HEIGHT: 120, //width is auto
        TOP: 43, //relative to base
        LEFT: 250, //relative to base,
        RULER:{
            TOP: 260,
            LEFT: 400
        },
        BASE:{
            TOP: 240,
            LEFT: 480,
            WIDTH: 240
        },
        BUTTONS:{
            VARIATIONS:{
                DISPLAY: 'block',
                POSX: 430,
                POSY: 190
            },
            ACCESSORIES:{
                DISPLAY: 'block',
                POSX: 530,
                POSY: 190
            }
        }
    }
    categories.MAGNET.PREVIEW = {
        HEIGHT: 225, //width is auto
        TOP: 220, //relative to base
        LEFT: 500, //relative to base
        RULER:{
            TOP: 220,
            LEFT: 400
        },
        BUTTONS:{
            VARIATIONS:{
                DISPLAY: 'block',
                POSX: 580,
                POSY: 300
            },
            ACCESSORIES:{
                DISPLAY: 'block',
                POSX: 580,
                POSY: 205
            }
        }
    }
    categories.MINIPIN.PREVIEW = {
        HEIGHT: 150, //width is auto
        TOP: 260, //relative to base
        LEFT: 555, //relative to base
        RULER:{
            TOP: 255,
            LEFT: 410
        },
        BUTTONS:{
            VARIATIONS:{
                DISPLAY: 'none',
                POSX: 580,
                POSY: 300
            },
            ACCESSORIES:{
                DISPLAY: 'block',
                POSX: 580,
                POSY: 205
            }
        }
    }
    
    //done loading things
    loadingSomething = false;
    $('#whiteoverlay').hide();
}
initStore();
