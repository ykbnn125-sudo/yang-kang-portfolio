const range=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
// User-curated order: previous 06/07/08 first; previous 01 last; other projects retain relative order.
export const originalProjects=[
 ['Webcam with Speaker','扬声器摄像头','Video & audio','视频与音频',[50],50,'Camera, light and sound in one product.','摄像、补光与声音的一体化设计。'],
 ['Webcam for Streamers','直播摄像头','Creator equipment','创作者设备',[49],49,'Designed around the streaming experience.','围绕直播场景展开设计。'],
 ['Webcam + Wireless Mic','无线领夹麦摄像头','Video communication','视频沟通',[48],48,'Bringing video and wireless audio together.','整合视频与无线收音体验。'],
 ['RoadFrame','行车记录仪','Dash camera','行车记录仪',[54],54,'A compact perspective on the road.','记录路途中的每一个视角。'],
 ['Wireless Baby Camera','无线婴儿摄像头','Connected care','智能看护',[53],53,'Wireless monitoring with temperature and humidity sensing.','结合温湿度监测的无线看护设备。'],
 ['NightNest','夜视摄像头','Camera design','摄像头设计',[52],52,'Exploring the form of a night vision camera.','夜视摄像头的产品形态探索。'],
 ['Gentle Care','婴儿监视器','Baby monitor','婴儿监视器',[51],51,'A dedicated screen for everyday care.','服务日常看护的专用显示设备。'],
 ['BIU “Family”','BIU 产品家族','Product family','系列产品',[47],47,'A shared design language across a product family.','以统一设计语言构建产品家族。'],
 ['Water Flosser','便携冲牙器','Oral care','口腔护理',range(42,46),43,'Portable care, expressive color.','便携护理与鲜明的色彩表达。'],
 ['Color, Material, Feeling','色彩、材质与感受','CMF research & application','CMF 研究与应用',range(30,41),40,'From research and inspiration to products on the market.','从研究与灵感，到上市产品的色彩表达。'],
 ['Gift Bag','品牌礼袋','Branding & packaging','品牌与包装',[28,29],28,'Colorful packaging with a consistent brand voice.','以鲜明色彩传达一致的品牌语言。'],
 ['Little Seahorse','小海马','Packaging design','包装设计',[27],27,'A fresh expression for floss packaging.','牙线包装的视觉与形态探索。'],
 ['Rocket Toothbrush','火箭牙刷','Children’s oral care','儿童口腔护理',[26],26,'A playful approach to everyday brushing.','让日常刷牙更有趣。'],
 ['Package Bag','双用途包装袋','Packaging design','包装设计',[24,25],24,'A packaging concept with a second purpose.','探索包装在使用之后的另一种可能。'],
 ['Facial Lifting Machine','面部提拉美容仪','Beauty device','美容仪器',range(18,23),22,'Beauty technology shaped by user insight.','由用户洞察出发的美容科技产品。'],
 ['Toothbrush / M','男性电动牙刷','Personal care','个人护理',range(12,17),16,'Precision for the everyday.','为日常赋予精确的力量。'],
 ['Tiny but “BIG”','便携牙刷','Research & product design','研究与产品设计',range(6,11),6,'Small in size. Big in experience.','小体积，大体验。'],
 ['Design explorations','设计探索','Independent explorations','独立设计探索',[55,56],56,'Objects, identities and digital experiences.','产品、品牌与数字体验的探索。']
].map(([name,zhName,category,zhCategory,pages,cover,en,zh])=>({name,zhName,category,pages,cover,en,zh,tag:[zhCategory,category.toUpperCase()],desc:[zh,en]}));

// Normalized image windows: composition only, the original pixels are unchanged.
export const coverWindows={6:[.43,0,.57,1],16:[.08,.21,.88,.73],22:[.08,.22,.85,.73],24:[.4,.1,.6,.9],26:[.4,.1,.6,.9],27:[.08,.38,.87,.51],28:[.43,.08,.57,.92],40:[.22,.12,.78,.88],43:[.05,.22,.9,.75],47:[.45,.22,.5,.73],48:[.46,.22,.48,.72],49:[.44,.22,.52,.73],50:[.48,.2,.47,.75],51:[.41,.28,.54,.62],52:[.49,.18,.46,.78],53:[.48,.2,.47,.75],54:[.44,.2,.51,.75],56:[.52,.28,.43,.64]};
export const researchPages=new Set([7,8,9,10,19,20,32,33,34,35]);
export const splitPages=new Set([6,12,18,24,26,28,42,47,48,49,50,51,52,53,54]);
export const asset=n=>`/assets/page-${String(n).padStart(2,'0')}.webp`;


// The numbers below refer to the archive before grouping.
const group=(numbers,name,zhName,category,zhCategory)=>({
 ...originalProjects[numbers[0]-1],name,zhName,category,
 tag:[zhCategory,category.toUpperCase()],
 pages:numbers.flatMap(n=>originalProjects[n-1].pages),
 en:numbers.length+' projects, from concept to detail.',
 zh:numbers.length+' 个项目，从概念到细节。',
 desc:[numbers.length+' 个项目的完整原始版面。',numbers.length+' projects, presented in their original layouts.']
});
export const projects=[
 {...group([1,2,3,4,5,6,7],'Connected Vision','影像与智能看护','Cameras & connected care','摄像与智能看护'),desc:['7 个项目，从 webcam 到行车记录仪，再到屏幕摄像头，均已完成上市。','All 7 projects—from webcams and dash cameras to cameras with displays—have launched.']},
 {...originalProjects[7],video:'/assets/biu-family-assembly-web.mp4'},originalProjects[8],originalProjects[9],
 {...group([11,12,14],'Packaging Collection','包装设计系列','Branding & packaging','品牌与包装'),pages:[27,28,29,24,25],desc:['沿用至今的“罐头”包装。','The “can” packaging design, still in use today.']},
 {...group([13,16,17],'Oral Care Collection','口腔护理系列','Oral care design','口腔护理设计'),desc:['不同年龄段的牙刷设计。','Toothbrush designs for different age groups.']},
 originalProjects[14],originalProjects[17]
];
