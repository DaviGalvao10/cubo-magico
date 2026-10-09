import { useMemo, useState } from 'react';
import { Badge, Button, Card, ProgressBar } from '../../components/ui';
import { CubeAnimationLesson } from '../../components/cube/CubeAnimationLesson';
import { createCourseAnimationLesson } from '../../data/cubeLessons/courseAnimations';
import { ALL_COURSES, ALL_LESSONS, ALL_MODULES } from '../../data';
import type { CubeLevel, CourseModule, Lesson } from '../../types';
import './CourseStructurePage.css';

type LessonStatus = 'completed' | 'available' | 'locked';

type ModuleOneLesson = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  visualTitle: string;
  visualDescription: string;
  example?: string;
  notation?: { move: string; meaning: string }[];
  algorithm?: string[];
};

function LessonAnimationVisual({ lesson }: { lesson: ModuleOneLesson }) {
  const animationLesson = useMemo(
    () => createCourseAnimationLesson(lesson.id, lesson.title),
    [lesson.id, lesson.title],
  );
  return <CubeAnimationLesson key={lesson.id} lesson={animationLesson} showHeading={false} />;
}

const MODULE_ONE_ID = 'mod-3x3-b-1';
const MODULE_TWO_ID = 'mod-3x3-b-2';
const MODULE_THREE_ID = 'mod-3x3-b-3';
const MODULE_FOUR_ID = 'mod-3x3-b-4';
const MODULE_INTERMEDIATE_ONE_ID = 'mod-3x3-i-1';
const MODULE_INTERMEDIATE_TWO_ID = 'mod-3x3-i-2';
const MODULE_INTERMEDIATE_THREE_ID = 'mod-3x3-i-3';
const MODULE_INTERMEDIATE_FOUR_ID = 'mod-3x3-i-4';

const MODULE_ONE_LESSONS: ModuleOneLesson[] = [
  {
    id: 'cube-pieces',
    title: 'Conhecendo as peças',
    description: 'Observe onde as peças coloridas se encontram: um centro tem uma cor, uma aresta une duas faces e um canto une três. Ao girar uma face, essas peças se deslocam juntas.',
    durationMinutes: 4,
    visualTitle: 'Peças que formam o cubo',
    visualDescription: 'O esquema mostra três faces de um cubo resolvido. Cada sticker pertence a uma peça; arestas e cantos continuam pelas faces vizinhas.',
    example: 'Um 3×3 tem 6 centros, 12 arestas (também chamadas meios) e 8 cantos. Os centros definem as cores das faces e mantêm sua posição relativa.',
  },
  {
    id: 'centers-edges-corners',
    title: 'Centros, meios e cantos',
    description: 'Para classificar uma peça, conte seus stickers: um sticker no centro da face é um centro; dois stickers formam uma aresta (ou meio); três stickers formam um canto.',
    durationMinutes: 5,
    visualTitle: 'Três tipos de peças',
    visualDescription: 'Centro: 1 cor · aresta/meio: 2 cores · canto: 3 cores. O desenho é uma referência; observe também a continuação das peças nas faces adjacentes.',
    example: 'O canto branco-vermelho-azul fica no vértice onde se encontram as faces branca, vermelha e azul; não pode ocupar um espaço de aresta.',
  },
  {
    id: 'faces-and-colors',
    title: 'Faces e cores',
    description: 'Uma face é um dos seis lados do cubo. Use o sticker central para nomeá-la: a face do centro azul é a face azul, mesmo que outras peças estejam fora do lugar.',
    durationMinutes: 4,
    visualTitle: 'As seis faces',
    visualDescription: 'Frente, trás, direita, esquerda, cima e baixo são nomes relativos à forma como você segura o cubo. A ilustração mostra frente, direita e cima.',
    example: 'Se o centro azul está voltado para você, azul é a frente; o centro amarelo no topo indica a face de cima.',
  },
  {
    id: 'holding-the-cube',
    title: 'Como segurar o cubo',
    description: 'Segure o cubo com uma face voltada para você e outra para cima. Mantenha essa orientação durante a sequência: R e L nomeiam lados, U e D nomeiam topo e base, F e B nomeiam frente e trás.',
    durationMinutes: 3,
    visualTitle: 'Encontre sua referência',
    visualDescription: 'A mesma face continua sendo F (frente) e a mesma face superior continua sendo U (cima) enquanto você executa uma sequência.',
    example: 'Com o centro azul voltado para você e o amarelo em cima, R é o lado à sua direita. Para mudar qual face é F, gire o cubo inteiro antes de começar a sequência.',
  },
  {
    id: 'basic-notation',
    title: 'Notação básica',
    description: 'Cada letra indica uma face: R direita, L esquerda, U cima, D baixo, F frente e B trás. O sentido horário é definido olhando diretamente para a face indicada; apóstrofo (’) inverte o sentido e 2 indica meia-volta.',
    durationMinutes: 7,
    visualTitle: 'Giros em notação',
    visualDescription: 'Cada letra nomeia uma face. Use estas referências para ler sequências de movimentos.',
    example: 'Leia R U R’ U’ como quatro giros nessa ordem. R’ é o inverso de R; F2 gira a face da frente 180° e não tem sentido horário ou anti-horário.',
    notation: [
      { move: 'R', meaning: 'Direita · horário olhando para R' },
      { move: 'L', meaning: 'Esquerda · horário olhando para L' },
      { move: 'U', meaning: 'Cima · horário olhando para U' },
      { move: 'D', meaning: 'Baixo · horário olhando para D' },
      { move: 'F', meaning: 'Frente · horário olhando para F' },
      { move: 'B', meaning: 'Trás · horário olhando para B' },
      { move: 'R’', meaning: 'Inverso de R' },
      { move: 'U’', meaning: 'Inverso de U' },
      { move: 'F2', meaning: 'Frente · meia-volta' },
    ],
  },
];

const MODULE_TWO_LESSONS: ModuleOneLesson[] = [
  {
    id: 'white-cross',
    title: 'Margarida para a cruz branca',
    description: 'Identifique as quatro arestas que têm branco. Com amarelo em cima, leve essas peças para a camada U ao redor do centro amarelo, formando a margarida; nesta preparação, não precisa alinhar as outras cores.',
    durationMinutes: 6,
    visualTitle: 'Prepare a margarida',
    visualDescription: 'O centro amarelo fica no topo e as quatro arestas brancas ocupam os espaços ao redor; os cantos não fazem parte da margarida.',
    example: 'Resultado desta preparação: quatro stickers brancos ao redor do centro amarelo. Depois, cada pétala será alinhada com seu centro lateral e transferida para a face branca.',
  },
  {
    id: 'align-cross-edges',
    title: 'Alinhar as peças da cruz',
    description: 'Com a margarida pronta, observe a cor lateral de uma pétala. Gire U até essa cor ficar sobre o centro da mesma cor; então gire essa face lateral meia-volta para levar a aresta à face branca. Repita com cada pétala ainda no topo.',
    durationMinutes: 5,
    visualTitle: 'Alinhe e transfira cada pétala',
    visualDescription: 'O esquema mostra a cruz branca formada. Ao terminar, cada aresta branca deve também combinar com o centro lateral de sua outra cor.',
    example: 'Se a pétala tem branco e verde, gire U até o sticker verde ficar sobre o centro verde; gire a face verde 180° (F2 se ela estiver à frente). Isso transfere a peça sem separar a correspondência de cores.',
    notation: [
      { move: 'U / U’', meaning: 'Alinhe a pétala ao centro lateral' },
      { move: 'F2', meaning: 'Gire 180° a face lateral alinhada' },
    ],
  },
  {
    id: 'insert-white-corners',
    title: 'Inserir os cantos brancos',
    description: 'Com a cruz branca embaixo, encontre na camada U um canto com branco. As outras duas cores identificam seu destino: o canto branco-verde-vermelho pertence entre os centros branco, verde e vermelho. Gire U para deixá-lo acima desse espaço, na posição frontal-direita, antes de usar o gatilho.',
    durationMinutes: 8,
    visualTitle: 'Encaixe um canto por vez',
    visualDescription: 'O canto é reconhecido pelas três cores e deve terminar no vértice comum às três faces correspondentes. A grade indica apenas a posição de referência.',
    example: 'Mantenha a face branca embaixo e o espaço alvo em frente à direita. Com o canto acima desse espaço, repita R U R’ U’ e confira após cada repetição: pare quando as três cores estiverem junto aos centros corretos. O gatilho desloca o canto para dentro sem exigir que se torça a peça no lugar.',
    notation: [
      { move: 'R U R’ U’', meaning: 'Gatilho para inserir o canto preparado' },
    ],
  },
  {
    id: 'check-first-layer',
    title: 'Conferir a primeira camada',
    description: 'Confira a face branca inteira e a fileira inferior de cada face lateral. A primeira camada só está concluída quando os quatro cantos e as quatro arestas brancas estão no lugar e cada sticker lateral combina com o centro da sua face.',
    durationMinutes: 4,
    visualTitle: 'Verifique a face e as laterais',
    visualDescription: 'O cubo mostra uma face branca completa como referência visual do objetivo; confira também os stickers laterais da camada junto à face branca.',
    example: 'Não basta ver uma face branca sólida: por exemplo, a aresta branco-verde precisa tocar a face do centro verde e o canto branco-verde-vermelho precisa tocar os centros dessas três cores.',
  },
];

const MODULE_THREE_LESSONS: ModuleOneLesson[] = [
  {
    id: 'middle-layer-pieces',
    title: 'Identificar as peças da segunda camada',
    description: 'A segunda camada contém quatro arestas entre a primeira e a última camada. Com branco embaixo e amarelo em cima, procure na camada U uma aresta de duas cores que não tenha amarelo; uma peça com amarelo pertence à última camada.',
    durationMinutes: 5,
    visualTitle: 'Procure meios sem amarelo',
    visualDescription: 'O esquema destaca uma aresta sem amarelo na camada superior e o espaço entre os centros verde e vermelho ao qual ela pode pertencer.',
    example: 'A aresta verde-vermelha deve terminar entre os centros verde e vermelho. Não a confunda com um canto, que tem três stickers, nem com uma aresta que contém amarelo.',
    notation: [
      { move: 'U', meaning: 'Camada de cima' },
      { move: 'F', meaning: 'Face da frente' },
      { move: 'R', meaning: 'Face da direita' },
    ],
  },
  {
    id: 'find-target-slot',
    title: 'Encontrar a posição correta',
    description: 'Com a primeira camada pronta, gire U para colocar uma aresta sem amarelo acima da frente. Alinhe seu sticker frontal ao centro da frente; o outro sticker deve combinar com o centro à direita ou à esquerda. Se combinar com o amarelo, escolha outra aresta.',
    durationMinutes: 5,
    visualTitle: 'Alinhe e descubra o lado',
    visualDescription: 'A aresta verde-vermelha aparece na camada U, acima do centro verde; o sticker vermelho aponta para o centro vermelho, à direita.',
    example: 'Gire U até o sticker verde da aresta ficar sobre o centro verde e voltado para a frente. Se o outro sticker for vermelho e o centro vermelho estiver à direita, use a inserção à direita; se estiver à esquerda, use o caso espelhado.',
    notation: [
      { move: 'U', meaning: 'Alinhe a cor frontal' },
      { move: 'U’', meaning: 'Ajuste no sentido oposto' },
    ],
  },
  {
    id: 'insert-right',
    title: 'Inserir para a direita',
    description: 'Coloque a aresta sem amarelo acima da frente, com a cor frontal alinhada ao centro da frente e a segunda cor correspondente ao centro da direita. Mantenha o branco embaixo e o amarelo em cima; então execute a sequência completa para inserir a aresta no slot frontal-direito.',
    durationMinutes: 7,
    visualTitle: 'Peça do topo para o slot direito',
    visualDescription: 'O esquema mostra a aresta verde-vermelha sobre a frente verde, destinada ao slot entre os centros verde e vermelho à direita.',
    example: 'Confirme primeiro o encaixe: verde está alinhado à frente e vermelho aponta para a direita. Faça U R U’ R’ U’ F’ U F, sem girar o cubo inteiro. A sequência abre o slot, insere a aresta e fecha as faces sem desfazer a primeira camada.',
    notation: [
      { move: 'U', meaning: 'Afaste o topo' },
      { move: 'R', meaning: 'Abra o lado direito' },
      { move: 'U’', meaning: 'Traga a peça' },
      { move: 'R’', meaning: 'Feche o lado direito' },
      { move: 'U’ F’ U F', meaning: 'Complete a inserção' },
    ],
  },
  {
    id: 'insert-left',
    title: 'Inserir para a esquerda',
    description: 'Depois de alinhar a primeira cor da aresta com o centro da frente, use a inserção à esquerda somente se a segunda cor combinar com o centro à esquerda. Mantenha branco embaixo e amarelo em cima durante a sequência.',
    durationMinutes: 7,
    visualTitle: 'Peça do topo para o slot esquerdo',
    visualDescription: 'A mesma aresta-alvo é observada com o destino indicado à esquerda; a ilustração esquematiza a posição, sem mostrar a face esquerda.',
    example: 'Se o sticker verde está alinhado ao centro frontal e o vermelho corresponde ao centro esquerdo, use U’ L’ U L U F U’ F’. O espelho da sequência abre o slot esquerdo e insere a aresta.',
    notation: [
      { move: 'U’', meaning: 'Afaste o topo' },
      { move: 'L’', meaning: 'Abra o lado esquerdo' },
      { move: 'U', meaning: 'Traga a peça' },
      { move: 'L', meaning: 'Feche o lado esquerdo' },
      { move: 'U F U’ F’', meaning: 'Complete a inserção' },
    ],
  },
  {
    id: 'fix-misplaced-edge',
    title: 'Corrigir uma peça mal posicionada',
    description: 'Localize a aresta mal posicionada pela dupla de cores e pelos centros que a cercam. Gire o cubo para deixar o slot incorreto à frente e à direita ou à esquerda; use a inserção correspondente para expulsar a aresta para U. Depois alinhe suas cores aos centros e insira-a corretamente.',
    durationMinutes: 6,
    visualTitle: 'Retire, alinhe, reinsira',
    visualDescription: 'O esquema identifica a aresta do meio que precisa ser retirada; após a sequência, ela deve aparecer na camada U para ser realinhada.',
    example: 'Não tente torcer a aresta no slot. Expulse-a com o caso do lado em que está, encontre-a no topo, alinhe cada cor ao centro correspondente e só então aplique a inserção direita ou esquerda.',
    notation: [
      { move: 'U', meaning: 'Alinhe no topo' },
      { move: 'R U’ R’', meaning: 'Liberte pelo lado direito' },
      { move: 'U’ L’ U L', meaning: 'Ou liberte pelo esquerdo' },
    ],
  },
];

const MODULE_FOUR_LESSONS: ModuleOneLesson[] = [
  {
    id: 'yellow-cross',
    title: 'Fazer a cruz amarela',
    description: 'Com as duas primeiras camadas resolvidas e amarelo em cima, observe os quatro stickers de aresta ao redor do centro amarelo. Oriente-os para cima e forme a cruz; nesta aula, não tente alinhar ainda as cores laterais.',
    durationMinutes: 7,
    visualTitle: 'Oriente as quatro arestas',
    visualDescription: 'O esquema mostra a cruz amarela no topo; os stickers dos cantos ainda podem não estar amarelos para cima.',
    example: 'Se vir uma linha, segure-a na horizontal. Se vir um L, deixe as duas arestas amarelas voltadas para trás e para a esquerda. Faça F R U R’ U’ F’. Se houver apenas o ponto, aplique a sequência, reavalie e posicione o L ou a linha antes da próxima execução. O algoritmo orienta arestas; não posiciona seus lados.',
    notation: [
      { move: 'F R U R’ U’ F’', meaning: 'Oriente as arestas no caso L ou linha' },
    ],
  },
  {
    id: 'orient-yellow-corners',
    title: 'Orientar os cantos amarelos',
    description: 'Com a cruz amarela pronta, observe os stickers dos quatro cantos. No padrão Sune representado, apenas o canto frontal-direito-superior (UFR) tem amarelo voltado para cima; os outros três stickers amarelos ficam nas laterais. Mantenha esse canto em UFR para usar o algoritmo mostrado.',
    durationMinutes: 8,
    visualTitle: 'Vire os cantos para cima',
    visualDescription: 'A cruz amarela está pronta e o sticker amarelo do canto UFR está voltado para cima; os outros cantos ainda não estão orientados.',
    example: 'Mantenha amarelo em cima e o canto orientado em UFR (frente-direita-cima). Faça R U R’ U R U2 R’ uma vez para orientar esse padrão Sune; confira novamente o topo. Se o desenho restante for outro, reconheça o novo caso em vez de repetir às cegas.',
    notation: [
      { move: 'R U R’ U R U2 R’', meaning: 'Sune · para o padrão correspondente' },
    ],
  },
  {
    id: 'position-yellow-corners',
    title: 'Posicionar os cantos',
    description: 'Com toda a face amarela orientada, verifique a posição dos cantos usando as três cores de cada peça e os três centros vizinhos. Um canto pode ter amarelo para cima e ainda estar no vértice errado. Se houver um canto já no vértice correto, mantenha amarelo em cima e coloque esse canto na posição frontal-direita-superior antes do ciclo.',
    durationMinutes: 7,
    visualTitle: 'Cada canto no seu lugar',
    visualDescription: 'A face amarela está orientada; os stickers laterais dos cantos ainda podem estar entre centros errados.',
    example: 'A sequência U R U’ L’ U R’ U’ L cicla os cantos. Use-a com um canto já correto em UFR (frente-direita-cima), reavalie as posições e repita somente se o ciclo ainda for necessário. Se nenhum canto estiver correto, aplique uma vez e procure novamente.',
    notation: [
      { move: 'U R U’ L’ U R’ U’ L', meaning: 'Cicle os cantos com UFR como referência' },
    ],
  },
  {
    id: 'position-yellow-edges',
    title: 'Posicionar as arestas',
    description: 'Com a face amarela completa e os cantos nos vértices corretos, confira as quatro arestas superiores pelas cores laterais. Para a sequência mostrada, coloque a aresta já alinhada atrás; o algoritmo Ua cicla as outras três. Se nenhuma estiver alinhada, faça um ciclo e confira de novo.',
    durationMinutes: 8,
    visualTitle: 'Alinhe as quatro laterais',
    visualDescription: 'O topo permanece amarelo; o esquema mostra as arestas laterais superiores desalinhadas em relação aos centros.',
    example: 'Mantenha amarelo em cima e a aresta já correta atrás. Faça R U’ R U R U R U’ R’ U’ R2. O ciclo Ua move as outras três arestas; depois ajuste U, U’ ou U2 apenas para alinhar a camada.',
    notation: [
      { move: 'R U’ R U R U R U’ R’ U’ R2', meaning: 'Ua · aresta correta atrás' },
    ],
  },
  {
    id: 'finish-cube',
    title: 'Finalizar o cubo',
    description: 'Confira as seis faces: cada sticker deve combinar com o centro da face e cada peça deve ocupar o lugar definido por suas cores. Se cantos e arestas já estiverem corretos e faltar apenas alinhar a camada superior, ajuste U, U’ ou U2.',
    durationMinutes: 4,
    visualTitle: 'Cubo resolvido',
    visualDescription: 'Seis faces completas, cores alinhadas aos centros e todas as peças na posição correta.',
    example: 'A ilustração mostra as três faces visíveis resolvidas. Verifique também as outras três faces antes de considerar o cubo completo.',
    notation: [
      { move: 'U', meaning: 'Ajuste final horário' },
      { move: 'U’', meaning: 'Ajuste final reverso' },
      { move: 'U2', meaning: 'Ajuste final meia-volta' },
    ],
  },
];

const MODULE_INTERMEDIATE_ONE_LESSONS: ModuleOneLesson[] = [
  {
    id: 'notation-review',
    title: 'Revisão da notação',
    description: 'Relembre as seis letras e mantenha a mesma orientação do cubo durante uma sequência. O sentido sem apóstrofo é horário olhando diretamente para a face nomeada; ’ inverte o giro e 2 significa meia-volta.',
    durationMinutes: 5,
    visualTitle: 'Símbolos, giros e orientação',
    visualDescription: 'Use os centros para identificar cada face; a ilustração é uma referência de orientação, não uma sequência de movimentos.',
    example: 'Leia R U R’ U’ da esquerda para a direita: direita, cima, inversa da direita e inversa de cima. A sequência termina sem girar o cubo inteiro.',
    notation: [
      { move: 'R', meaning: 'Horário olhando diretamente para R' },
      { move: 'R’', meaning: 'Inverso de R' },
      { move: 'U2', meaning: 'Meia-volta da face de cima' },
    ],
  },
  {
    id: 'efficient-moves',
    title: 'Movimentos mais eficientes',
    description: 'Antes de mover, identifique a face indicada e mantenha os centros de referência na mesma posição. Gire a face solicitada em vez de rodar o cubo inteiro; isso reduz reposicionamentos e facilita acompanhar o algoritmo.',
    durationMinutes: 6,
    visualTitle: 'Gire faces, não o cubo inteiro',
    visualDescription: 'Os centros continuam definindo frente, direita e cima enquanto você executa giros de face; a figura mostra um estado de referência.',
    example: 'Se a sequência pede U, gire a camada superior 90° no sentido horário visto de cima. Não rode o cubo inteiro para levar essa face à frente.',
    notation: [
      { move: 'U', meaning: 'Horário olhando para cima' },
      { move: 'U’', meaning: 'Inverso de U' },
      { move: 'U2', meaning: 'Dois quartos de volta' },
    ],
  },
  {
    id: 'basic-finger-tricks',
    title: 'Finger tricks básicos',
    description: 'Um finger trick é usar os dedos para girar uma face sem trocar toda a pegada. Comece devagar, com o cubo apoiado sem apertar; para U, experimente um impulso do indicador e escolha a mão que mantém sua pegada estável.',
    durationMinutes: 7,
    visualTitle: 'Dedos em movimento',
    visualDescription: 'O esquema destaca faces e dedos como referência; a mão usada para U ou U’ depende da pegada confortável de cada pessoa.',
    example: 'Pratique U e depois U’ até voltar à posição inicial. Reduza a força e mantenha os polegares apoiados; não há um único dedo obrigatório para cada sentido.',
    notation: [
      { move: 'U / U’', meaning: 'Giros opostos da face superior' },
      { move: 'R / R’', meaning: 'Giros opostos da face direita' },
      { move: 'R U R’', meaning: 'Pratique o encadeamento' },
    ],
  },
  {
    id: 'quick-piece-recognition',
    title: 'Reconhecimento rápido de peças',
    description: 'Escolha uma peça-alvo pela combinação de cores e use os centros para definir seu destino. Uma aresta tem duas cores: procure os dois stickers, não apenas um, antes de mover.',
    durationMinutes: 6,
    visualTitle: 'Localize a peça pelo par de cores',
    visualDescription: 'A aresta azul-laranja deve ficar entre os centros azul e laranja; observe os dois stickers da peça.',
    example: 'Para encontrar a aresta azul-laranja, localize um sticker azul e confira o sticker vizinho na mesma peça. Se for laranja, compare sua posição com os centros azul e laranja antes de escolher o movimento.',
    notation: [
      { move: 'F', meaning: 'Face da frente e seu centro' },
      { move: 'U', meaning: 'Camada superior' },
      { move: 'R', meaning: 'Face da direita e seu centro' },
    ],
  },
  {
    id: 'reduce-unnecessary-moves',
    title: 'Como reduzir movimentos desnecessários',
    description: 'Antes de girar, diga qual peça vai mover e onde ela deve chegar. Depois simplifique apenas movimentos consecutivos da mesma face, conferindo que a nova sequência produz o mesmo resultado e não desfaz peças resolvidas.',
    durationMinutes: 6,
    visualTitle: 'Observe, planeje e execute',
    visualDescription: 'A ilustração é uma referência para planejar; as equivalências abaixo são algébricas e não representam uma resolução completa.',
    example: 'U U equivale a U2 (meia-volta). U seguido imediatamente de U’ retorna a camada ao início e pode ser removido se nenhum movimento intermediário depender dessa posição.',
    notation: [
      { move: 'U U', meaning: 'Equivale a U2' },
      { move: 'U U’', meaning: 'Movimentos se cancelam' },
    ],
  },
];
const LEVELS: { id: CubeLevel; label: string; description: string }[] = [
  { id: 'basic', label: 'Básico', description: 'Método de camadas' },
  { id: 'intermediate', label: 'Médio', description: 'CFOP reduzido' },
  { id: 'advanced', label: 'Avançado', description: 'CFOP e speedcubing' },
];

const MODULE_INTERMEDIATE_TWO_LESSONS: ModuleOneLesson[] = [
  {
    id: 'recognize-patterns',
    title: 'Reconhecer padrões rapidamente',
    description: 'Antes de executar um algoritmo, observe quais stickers amarelos estão voltados para cima e quais peças ainda não estão no lugar. OLL orienta a última camada; PLL só permuta suas peças depois que toda a face amarela está orientada.',
    durationMinutes: 6,
    visualTitle: 'Leia o padrão antes dos giros',
    visualDescription: 'A face superior é um esquema de padrões de orientação, não a representação exata de um caso de algoritmo específico.',
    example: 'Confira primeiro se a cruz amarela está pronta. Se não estiver, identifique o desenho de ponto, L ou linha; F R U R’ U’ F’ é para os casos L ou linha com a orientação preparada, não para qualquer padrão.',
    notation: [
      { move: 'OLL', meaning: 'Deixar amarelo voltado para cima' },
      { move: 'PLL', meaning: 'Trocar peças após orientar a face' },
      { move: 'U', meaning: 'Ajuste de alinhamento, se o caso permitir' },
    ],
    algorithm: ['F', 'R', 'U', 'R’', 'U’', 'F’'],
  },
  {
    id: 'algorithm-stages',
    title: 'Entender algoritmos por etapas',
    description: 'Leia a sequência completa antes de começar e divida-a em blocos que você consiga executar e conferir. A divisão ajuda a memorizar a ordem; não muda a função matemática dos movimentos.',
    durationMinutes: 7,
    visualTitle: 'Agrupe os movimentos em blocos',
    visualDescription: 'Os separadores apenas agrupam a notação para estudo; todos os movimentos pertencem à mesma sequência.',
    example: 'No caso de cruz amarela L/linha, leia F R U | R’ U’ | F’. O objetivo do conjunto é orientar as arestas do topo; pratique cada bloco e depois execute os seis movimentos na ordem, sem reorientar o cubo no meio.',
    notation: [
      { move: 'F R U', meaning: 'Primeiro bloco de leitura' },
      { move: 'R’ U’', meaning: 'Continuação da sequência' },
      { move: 'F’', meaning: 'Último movimento' },
    ],
    algorithm: ['F', 'R', 'U', '·', 'R’', 'U’', '·', 'F’'],
  },
  {
    id: 'maintain-orientation',
    title: 'Executar algoritmos sem perder a orientação',
    description: 'Escolha a frente e o topo antes de iniciar. Durante a sequência, R, U e F continuam nomeando essas mesmas faces; girar o cubo no meio altera a referência e pode fazer você executar outro movimento.',
    durationMinutes: 6,
    visualTitle: 'Fixe a frente e o topo',
    visualDescription: 'Os centros marcam a frente e o topo a acompanhar durante toda a sequência.',
    example: 'Para F R U R’ U’ F’, deixe F voltada para você e U para cima. Execute nessa ordem sem rodar o cubo inteiro; a sequência serve ao caso de cruz previamente reconhecido.',
    notation: [
      { move: 'F', meaning: 'Face escolhida como frente' },
      { move: 'U', meaning: 'Face escolhida como topo' },
      { move: 'R’', meaning: 'Inverso da face direita fixa' },
    ],
    algorithm: ['F', 'R', 'U', 'R’', 'U’', 'F’'],
  },
  {
    id: 'repeat-and-memorize',
    title: 'Repetição e memorização',
    description: 'Pratique primeiro a sequência para a cruz amarela nos casos compatíveis. Leia cada símbolo, mantenha a mesma orientação e confira o resultado antes de repetir; acelere somente quando os giros estiverem corretos.',
    durationMinutes: 7,
    visualTitle: 'Repita com intenção',
    visualDescription: 'O cubo é um apoio para manter a referência de frente e topo; o algoritmo abaixo só deve ser praticado no padrão L ou linha preparado.',
    example: 'Pratique F R U R’ U’ F’ três vezes em um caso preparado de L/linha, reconfigurando o caso entre repetições. Não aplique a sequência repetidamente ao acaso.',
    notation: [
      { move: 'F R U', meaning: 'Primeiro bloco' },
      { move: 'R’ U’ F’', meaning: 'Segundo bloco' },
    ],
    algorithm: ['F', 'R', 'U', 'R’', 'U’', 'F’'],
  },
  {
    id: 'apply-in-cases',
    title: 'Aplicar algoritmos em casos diferentes',
    description: 'Um ajuste U pode alinhar a referência de um mesmo caso, mas não transforma qualquer padrão em um caso que use o mesmo algoritmo. Identifique o desenho, prepare sua orientação e só então escolha a sequência correspondente.',
    durationMinutes: 7,
    visualTitle: 'Compare antes e depois',
    visualDescription: 'O padrão da ilustração é esquemático; use-o para observar a face superior, não como identificação de um caso completo.',
    example: 'Use F R U R’ U’ F’ apenas quando reconheceu o caso L ou linha e o posicionou corretamente. Se o padrão for diferente, não force a sequência nem suponha que U o corrige: reconheça o outro caso e escolha o algoritmo apropriado.',
    notation: [
      { move: 'U / U’ / U2', meaning: 'Ajustes de 90° ou 180°' },
      { move: 'F R U R’ U’ F’', meaning: 'Somente para o caso L/linha preparado' },
    ],
    algorithm: ['U', 'F', 'R', 'U', 'R’', 'U’', 'F’'],
  },
];

const MODULE_INTERMEDIATE_THREE_LESSONS: ModuleOneLesson[] = [
  {
    id: 'speedcubing-introduction',
    title: 'Introdução ao speedcubing',
    description: 'Speedcubing é resolver o cubo buscando consistência, eficiência e tempo menor. Primeiro reconheça as etapas e execute os movimentos sem erros; velocidade sem controle aumenta as pausas e as correções.',
    durationMinutes: 6,
    visualTitle: 'Consistência antes da velocidade',
    visualDescription: 'O cubo resolvido serve como referência de orientação; não representa uma execução cronometrada.',
    example: 'Pratique uma sequência já aprendida devagar, dizendo os movimentos antes de fazê-los. Só aumente o ritmo quando mantiver a precisão; F2L, OLL e PLL são etapas do método CFOP, não movimentos.',
    notation: [
      { move: 'F2L', meaning: 'Formar e inserir pares nas duas camadas' },
      { move: 'OLL', meaning: 'Orientar a face superior' },
      { move: 'PLL', meaning: 'Permutar peças da última camada' },
    ],
    algorithm: ['R', 'U', 'R’', 'U’'],
  },
  {
    id: 'improve-turning-speed',
    title: 'Melhorar a velocidade dos movimentos',
    description: 'Para melhorar a velocidade, pratique giros completos e controlados sem apertar o cubo. Mantenha a mesma pegada e confira que cada face terminou alinhada antes de aumentar o ritmo.',
    durationMinutes: 7,
    visualTitle: 'Giros curtos e controlados',
    visualDescription: 'O cubo resolvido mostra o alinhamento que você deve recuperar depois de cada giro; não ilustra um caso de resolução.',
    example: 'Faça U e depois U’: como são inversos, a camada superior deve voltar ao início. Em seguida faça U2, que é meia-volta. Pratique devagar até a camada parar alinhada.',
    notation: [
      { move: 'U', meaning: 'Horário olhando para cima' },
      { move: 'U’', meaning: 'Inverso de U' },
      { move: 'U2', meaning: 'Meia-volta do topo' },
    ],
    algorithm: ['U', 'U’', 'U2'],
  },
  {
    id: 'intermediate-finger-tricks',
    title: 'Finger tricks intermediários',
    description: 'Finger tricks usam dedos para acionar as faces sem soltar e agarrar o cubo a cada giro. Experimente diferentes dedos conforme sua pegada; o objetivo é reduzir reposicionamentos sem perder controle.',
    durationMinutes: 7,
    visualTitle: 'Reduza reposicionamentos',
    visualDescription: 'A face U pode ser acionada com um dedo enquanto as mãos sustentam o cubo; a técnica depende da pegada.',
    example: 'Pratique R U R’ lentamente: gire R, acione U com um dedo sem soltar o cubo e complete R’. Ajuste a pegada se o cubo escorregar; não force uma técnica desconfortável.',
    notation: [
      { move: 'R', meaning: 'Giro da face direita' },
      { move: 'U', meaning: 'Giro do topo com o dedo' },
      { move: 'R’', meaning: 'Retorno da face direita' },
    ],
    algorithm: ['R', 'U', 'R’'],
  },
  {
    id: 'execute-algorithms-fluidly',
    title: 'Executar algoritmos com fluidez',
    description: 'Antes de executar, leia toda a sequência e identifique seus blocos. Mantenha a mesma frente e o mesmo topo; conecte os giros somente quando cada movimento estiver correto.',
    durationMinutes: 7,
    visualTitle: 'Conecte os blocos',
    visualDescription: 'O cubo é uma referência para manter a orientação durante a prática; não representa o resultado específico do gatilho.',
    example: 'Pratique R U R’ U’ como exercício de sequência: R e R’ são inversos, assim como U e U’. Faça sem pausas apenas quando conseguir completar os quatro giros com precisão.',
    notation: [
      { move: 'R U', meaning: 'Primeiro trecho' },
      { move: 'R’ U’', meaning: 'Segundo trecho' },
      { move: 'R U R’ U’', meaning: 'Sequência completa' },
    ],
    algorithm: ['R', 'U', 'R’', 'U’'],
  },
  {
    id: 'solve-without-pauses',
    title: 'Resolver sem pausas',
    description: 'Durante a resolução, use o tempo de execução do par atual para localizar a próxima peça que será necessária. Primeiro observe sua combinação de cores e destino; não acelere nem execute o próximo par antes de saber onde ele vai.',
    durationMinutes: 8,
    visualTitle: 'Planeje o próximo par',
    visualDescription: 'A ilustração é uma referência para praticar observação; ela não identifica um par F2L específico.',
    example: 'Ao inserir um canto e sua aresta no slot atual, procure com os olhos a próxima aresta de duas cores e localize o canto correspondente. Planeje o próximo destino enquanto termina o par, sem fazer giros extras às cegas.',
    notation: [
      { move: 'F2L', meaning: 'Planeje o próximo par canto + aresta' },
      { move: 'OLL', meaning: 'Próxima etapa após as duas camadas' },
      { move: 'PLL', meaning: 'Etapa após orientar o topo' },
    ],
    algorithm: ['R', 'U', 'R’', 'U’'],
  },
];

const MODULE_INTERMEDIATE_FOUR_LESSONS: ModuleOneLesson[] = [
  {
    id: 'analyze-a-solve',
    title: 'Analisar uma resolução',
    description: 'Escolha uma resolução recente e reveja uma etapa por vez. Anote qual peça estava procurando, onde precisava chegar, quais giros executou e se manteve a mesma orientação do cubo.',
    durationMinutes: 7,
    visualTitle: 'Observe a sequência completa',
    visualDescription: 'A ilustração é um cubo de referência; use seu próprio registro de movimentos para analisar o estado real da resolução.',
    example: 'Depois de resolver, escolha um par F2L: identifique o canto e a aresta pelas cores, marque o slot de destino e compare os giros usados. Anote um movimento extra que poderia ter evitado, sem assumir que o desenho do cubo representa seu caso.',
    notation: [
      { move: 'F2L', meaning: 'Formar e inserir cada par' },
      { move: 'OLL', meaning: 'Orientar stickers do topo' },
      { move: 'PLL', meaning: 'Permutar peças já orientadas' },
    ],
    algorithm: ['R', 'U', 'R’', 'U’'],
  },
  {
    id: 'remove-unnecessary-moves',
    title: 'Identificar movimentos desnecessários',
    description: 'Revise a notação procurando giros inversos consecutivos e movimentos repetidos na mesma face. Antes de removê-los, confirme que estão lado a lado na sequência e que nenhum movimento entre eles altera o estado.',
    durationMinutes: 7,
    visualTitle: 'Encontre giros que se cancelam',
    visualDescription: 'O cubo resolvido é um ponto de referência; a simplificação abaixo é feita na sequência escrita, não por comparação de stickers.',
    example: 'U U’ retorna o topo ao estado inicial e pode ser removido. U U pode ser substituído por U2. Não remova movimentos não consecutivos sem verificar o efeito dos movimentos que ficam entre eles.',
    notation: [
      { move: 'U U’', meaning: 'Cancelam-se quando consecutivos' },
      { move: 'U U', meaning: 'Equivale a U2' },
      { move: 'U2', meaning: 'Meia-volta de U' },
    ],
    algorithm: ['U', 'U’', '·', 'U2'],
  },
  {
    id: 'plan-next-moves',
    title: 'Planejar os próximos movimentos',
    description: 'Antes de inserir o par atual, localize a próxima aresta e o canto que a acompanha. Use os centros para reconhecer suas cores e antecipe o slot de destino; planejar não significa executar movimentos sem conferir a posição.',
    durationMinutes: 8,
    visualTitle: 'Antecipe o próximo par',
    visualDescription: 'O cubo é um esquema de referência; localize as peças no seu próprio estado antes de planejar a transição.',
    example: 'Enquanto executa um par F2L, encontre uma aresta pelas duas cores e identifique o canto com as mesmas cores mais a cor do topo. Decida em qual slot o par deve entrar após o atual.',
    notation: [
      { move: 'F2L 1', meaning: 'Execute o par atual' },
      { move: 'F2L 2', meaning: 'Localize o próximo par' },
      { move: 'U', meaning: 'Ajuste somente se necessário' },
    ],
    algorithm: ['R', 'U', 'R’', '·', 'U', 'L', 'U’', 'L’'],
  },
  {
    id: 'smooth-algorithm-transitions',
    title: 'Melhorar a fluidez entre algoritmos',
    description: 'Ao terminar uma etapa, confira o estado antes de começar a seguinte. Mantenha a frente e o topo escolhidos; faça apenas o ajuste U necessário para alinhar o caso seguinte, sem girar o cubo inteiro automaticamente.',
    durationMinutes: 7,
    visualTitle: 'Conecte uma etapa à próxima',
    visualDescription: 'O cubo serve como referência de orientação; para iniciar PLL, a face superior já precisa estar toda orientada.',
    example: 'Depois de OLL, confira se todos os stickers amarelos estão no topo. Só então reconheça o caso PLL e aplique o ajuste U indicado para o algoritmo; não comece PLL se a face ainda não estiver orientada.',
    notation: [
      { move: 'OLL', meaning: 'Oriente toda a face superior' },
      { move: 'U', meaning: 'Ajuste antes do caso seguinte, se necessário' },
      { move: 'PLL', meaning: 'Permute com a face já orientada' },
    ],
    algorithm: ['F', 'R', 'U', 'R’', 'U’', 'F’', '·', 'U'],
  },
  {
    id: 'compare-solutions',
    title: 'Comparar uma resolução básica com uma resolução eficiente',
    description: 'Compare a resolução por camadas com uma abordagem CFOP reduzida para o mesmo embaralhamento. Avalie o que cada método faz, quantas vezes reposiciona o cubo e se a sequência continua precisa; não compare apenas velocidade.',
    durationMinutes: 8,
    visualTitle: 'Compare as duas abordagens',
    visualDescription: 'A ilustração é apenas uma referência: compare as duas sequências aplicadas ao mesmo cubo embaralhado para que a avaliação seja justa.',
    example: 'No método de camadas, complete a primeira camada e depois insira as arestas da segunda. No F2L, combine cada canto e sua aresta e insira o par junto no slot. Compare o plano e os giros no mesmo estado inicial; não conclua que todo caso CFOP usa menos movimentos.',
    notation: [
      { move: 'Camadas', meaning: 'Primeira camada, depois segunda' },
      { move: 'F2L', meaning: 'Inserir canto + aresta como par' },
      { move: 'OLL · PLL', meaning: 'Orientar, depois permutar o topo' },
    ],
    algorithm: ['R', 'U', 'R’', '·', 'F', 'R', 'U', 'R’', 'U’', 'F’'],
  },
];

const LEVEL_COURSE_IDS: Record<CubeLevel, string> = {
  basic: '3x3-basic',
  intermediate: '3x3-intermediate',
  advanced: '3x3-advanced',
};

const LEVEL_LABELS: Record<CubeLevel, string> = {
  basic: 'Básico',
  intermediate: 'Médio',
  advanced: 'Avançado',
};

function getLessonStatus(lesson: Lesson): LessonStatus {
  if (lesson.order === 1) return 'completed';
  if (lesson.order === 2) return 'available';
  return 'locked';
}

function getStatusLabel(status: LessonStatus): string {
  if (status === 'completed') return 'Concluída';
  if (status === 'available') return 'Disponível';
  return 'Bloqueada';
}

function getStatusIcon(status: LessonStatus): string {
  if (status === 'completed') return '✓';
  if (status === 'available') return '→';
  return '⌑';
}

function ModuleOneLearning({
  completedCount,
  onProgressChange,
}: {
  completedCount: number;
  onProgressChange: (count: number) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(
    Math.min(completedCount, MODULE_ONE_LESSONS.length - 1),
  );
  const lesson = MODULE_ONE_LESSONS[selectedIndex];
  const lessonProgress = Math.round((completedCount / MODULE_ONE_LESSONS.length) * 100);

  const getStatus = (index: number): LessonStatus => {
    if (index < completedCount) return 'completed';
    if (index === completedCount) return 'available';
    return 'locked';
  };

  const goToNextLesson = () => {
    if (selectedIndex >= MODULE_ONE_LESSONS.length - 1) {
      onProgressChange(MODULE_ONE_LESSONS.length);
      return;
    }
    const nextCompletedCount = Math.max(completedCount, selectedIndex + 1);
    onProgressChange(nextCompletedCount);
    setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="module-one-learning">
      <section className="module-one-progress" aria-label="Progresso do módulo">
        <div className="module-one-progress-copy">
          <div>
            <strong>Sua jornada neste módulo</strong>
            <span>{completedCount} de {MODULE_ONE_LESSONS.length} aulas concluídas</span>
          </div>
          <strong>{lessonProgress}%</strong>
        </div>
        <ProgressBar value={lessonProgress} color="gradient" height={8} />
      </section>

      <nav className="module-one-lesson-nav" aria-label="Aulas do módulo Conhecendo o Cubo">
        {MODULE_ONE_LESSONS.map((item, index) => {
          const status = getStatus(index);
          return (
            <button
              key={item.id}
              type="button"
              className={`module-one-lesson-nav-item status-${status} ${selectedIndex === index ? 'is-current' : ''}`}
              disabled={status === 'locked'}
              onClick={() => setSelectedIndex(index)}
              aria-current={selectedIndex === index ? 'step' : undefined}
              aria-label={`Aula ${index + 1}: ${item.title}. ${getStatusLabel(status)}`}
            >
              <span>{status === 'completed' ? '✓' : String(index + 1).padStart(2, '0')}</span>
            </button>
          );
        })}
      </nav>

      <Card variant="elevated" className="module-one-lesson-card">
        <div className="module-one-lesson-heading">
          <div>
            <span className="course-module-kicker">Aula {selectedIndex + 1} de {MODULE_ONE_LESSONS.length}</span>
            <h3>{lesson.title}</h3>
          </div>
          <Badge variant="face" faceColor="blue" size="sm">{lesson.durationMinutes} min</Badge>
        </div>

        <p className="module-one-lesson-description">{lesson.description}</p>

        <div className="module-one-visual">
          <LessonAnimationVisual lesson={lesson} />
        </div>

        {lesson.notation && (
          <div className="module-one-notation" aria-label="Referência visual de notação">
            <div className="module-one-notation-heading">
              <strong>Guia rápido de notação</strong>
              <span>Sentido horário visto de frente para a face</span>
            </div>
            <div className="module-one-notation-grid">
              {lesson.notation.map(({ move, meaning }) => (
                <div className="module-one-notation-item" key={move}>
                  <span className="notation-key">{move}</span>
                  <span>{meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {lesson.example && (
          <div className="module-one-example">
            <span className="module-one-example-icon" aria-hidden="true">✦</span>
            <div>
              <strong>Exemplo</strong>
              <p>{lesson.example}</p>
            </div>
          </div>
        )}

        <div className="module-one-lesson-footer">
          <span>
            {completedCount >= MODULE_ONE_LESSONS.length
              ? 'Módulo concluído'
              : `Aula ${selectedIndex + 1} de ${MODULE_ONE_LESSONS.length}`}
          </span>
          <Button
            type="button"
            variant="cube-accent"
            onClick={goToNextLesson}
          >
            {selectedIndex === MODULE_ONE_LESSONS.length - 1 ? 'Concluir módulo' : 'Próxima aula'}
            <span aria-hidden="true">{selectedIndex === MODULE_ONE_LESSONS.length - 1 ? '✓' : '→'}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function ModuleTwoLearning({
  completedCount,
  onProgressChange,
}: {
  completedCount: number;
  onProgressChange: (count: number) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(
    Math.min(completedCount, MODULE_TWO_LESSONS.length - 1),
  );
  const lesson = MODULE_TWO_LESSONS[selectedIndex];
  const lessonProgress = Math.round((completedCount / MODULE_TWO_LESSONS.length) * 100);

  const getStatus = (index: number): LessonStatus => {
    if (index < completedCount) return 'completed';
    if (index === completedCount) return 'available';
    return 'locked';
  };

  const goToNextLesson = () => {
    if (selectedIndex >= MODULE_TWO_LESSONS.length - 1) {
      onProgressChange(MODULE_TWO_LESSONS.length);
      return;
    }
    const nextCompletedCount = Math.max(completedCount, selectedIndex + 1);
    onProgressChange(nextCompletedCount);
    setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="module-one-learning module-two-learning">
      <section className="module-one-progress" aria-label="Progresso do módulo Primeira Camada">
        <div className="module-one-progress-copy">
          <div>
            <strong>Sua jornada neste módulo</strong>
            <span>{completedCount} de {MODULE_TWO_LESSONS.length} aulas concluídas</span>
          </div>
          <strong>{lessonProgress}%</strong>
        </div>
        <ProgressBar value={lessonProgress} color="gradient" height={8} />
      </section>

      <nav className="module-one-lesson-nav" aria-label="Aulas do módulo Primeira Camada">
        {MODULE_TWO_LESSONS.map((item, index) => {
          const status = getStatus(index);
          return (
            <button
              key={item.id}
              type="button"
              className={`module-one-lesson-nav-item status-${status} ${selectedIndex === index ? 'is-current' : ''}`}
              disabled={status === 'locked'}
              onClick={() => setSelectedIndex(index)}
              aria-current={selectedIndex === index ? 'step' : undefined}
              aria-label={`Aula ${index + 1}: ${item.title}. ${getStatusLabel(status)}`}
            >
              <span>{status === 'completed' ? '✓' : String(index + 1).padStart(2, '0')}</span>
            </button>
          );
        })}
      </nav>

      <Card variant="elevated" className="module-one-lesson-card">
        <div className="module-one-lesson-heading">
          <div>
            <span className="course-module-kicker">Aula {selectedIndex + 1} de {MODULE_TWO_LESSONS.length}</span>
            <h3>{lesson.title}</h3>
          </div>
          <Badge variant="face" faceColor="blue" size="sm">{lesson.durationMinutes} min</Badge>
        </div>

        <p className="module-one-lesson-description">{lesson.description}</p>

        <div className={`module-two-visual module-two-visual--${selectedIndex}`}>
          <LessonAnimationVisual lesson={lesson} />
        </div>

        {lesson.notation && (
          <div className="module-one-notation" aria-label="Movimentos desta aula">
            <div className="module-one-notation-heading">
              <strong>Movimentos em foco</strong>
              <span>Leia da esquerda para a direita</span>
            </div>
            <div className="module-one-notation-grid">
              {lesson.notation.map(({ move, meaning }) => (
                <div className="module-one-notation-item" key={move}>
                  <span className="notation-key">{move}</span>
                  <span>{meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {lesson.example && (
          <div className="module-one-example">
            <span className="module-one-example-icon" aria-hidden="true">✦</span>
            <div>
              <strong>{selectedIndex === 2 ? 'Exemplo de sequência' : 'Dica visual'}</strong>
              <p>{lesson.example}</p>
              {selectedIndex === 2 && (
                <div className="module-two-algorithm" aria-label="Algoritmo R U R primo U primo">
                  {['R', 'U', 'R’', 'U’'].map((move) => (
                    <span className="notation-key" key={move}>{move}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="module-one-lesson-footer">
          <span>
            {completedCount >= MODULE_TWO_LESSONS.length
              ? 'Módulo concluído'
              : `Aula ${selectedIndex + 1} de ${MODULE_TWO_LESSONS.length}`}
          </span>
          <Button
            type="button"
            variant="cube-accent"
            onClick={goToNextLesson}
          >
            {selectedIndex === MODULE_TWO_LESSONS.length - 1 ? 'Concluir módulo' : 'Próxima aula'}
            <span aria-hidden="true">{selectedIndex === MODULE_TWO_LESSONS.length - 1 ? '✓' : '→'}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function ModuleThreeLearning({
  completedCount,
  onProgressChange,
}: {
  completedCount: number;
  onProgressChange: (count: number) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(
    Math.min(completedCount, MODULE_THREE_LESSONS.length - 1),
  );
  const lesson = MODULE_THREE_LESSONS[selectedIndex];
  const lessonProgress = Math.round((completedCount / MODULE_THREE_LESSONS.length) * 100);

  const getStatus = (index: number): LessonStatus => {
    if (index < completedCount) return 'completed';
    if (index === completedCount) return 'available';
    return 'locked';
  };

  const goToNextLesson = () => {
    if (selectedIndex >= MODULE_THREE_LESSONS.length - 1) {
      onProgressChange(MODULE_THREE_LESSONS.length);
      return;
    }
    onProgressChange(Math.max(completedCount, selectedIndex + 1));
    setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="module-one-learning module-three-learning">
      <section className="module-one-progress" aria-label="Progresso do módulo Segunda Camada">
        <div className="module-one-progress-copy">
          <div>
            <strong>Sua jornada neste módulo</strong>
            <span>{completedCount} de {MODULE_THREE_LESSONS.length} aulas concluídas</span>
          </div>
          <strong>{lessonProgress}%</strong>
        </div>
        <ProgressBar value={lessonProgress} color="gradient" height={8} />
      </section>

      <nav className="module-one-lesson-nav" aria-label="Aulas do módulo Segunda Camada">
        {MODULE_THREE_LESSONS.map((item, index) => {
          const status = getStatus(index);
          return (
            <button
              key={item.id}
              type="button"
              className={`module-one-lesson-nav-item status-${status} ${selectedIndex === index ? 'is-current' : ''}`}
              disabled={status === 'locked'}
              onClick={() => setSelectedIndex(index)}
              aria-current={selectedIndex === index ? 'step' : undefined}
              aria-label={`Aula ${index + 1}: ${item.title}. ${getStatusLabel(status)}`}
            >
              <span>{status === 'completed' ? '✓' : String(index + 1).padStart(2, '0')}</span>
            </button>
          );
        })}
      </nav>

      <Card variant="elevated" className="module-one-lesson-card">
        <div className="module-one-lesson-heading">
          <div>
            <span className="course-module-kicker">Aula {selectedIndex + 1} de {MODULE_THREE_LESSONS.length}</span>
            <h3>{lesson.title}</h3>
          </div>
          <Badge variant="face" faceColor="blue" size="sm">{lesson.durationMinutes} min</Badge>
        </div>

        <p className="module-one-lesson-description">{lesson.description}</p>

        <div className={`module-two-visual module-three-visual module-three-visual--${selectedIndex}`}>
          <LessonAnimationVisual lesson={lesson} />
        </div>

        {lesson.notation && (
          <div className="module-one-notation" aria-label="Movimentos desta aula">
            <div className="module-one-notation-heading">
              <strong>Movimentos em foco</strong>
              <span>Leia a sequência da esquerda para a direita</span>
            </div>
            <div className="module-one-notation-grid">
              {lesson.notation.map(({ move, meaning }) => (
                <div className="module-one-notation-item" key={move}>
                  <span className="notation-key">{move}</span>
                  <span>{meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {lesson.example && (
          <div className="module-one-example">
            <span className="module-one-example-icon" aria-hidden="true">✦</span>
            <div>
              <strong>{selectedIndex === 2 || selectedIndex === 3 ? 'Algoritmo de inserção' : 'Dica de observação'}</strong>
              <p>{lesson.example}</p>
              {(selectedIndex === 2 || selectedIndex === 3) && (
                <div className="module-three-algorithm">
                  {(selectedIndex === 2
                    ? ['U', 'R', 'U’', 'R’', 'U’', 'F’', 'U', 'F']
                    : ['U’', 'L’', 'U', 'L', 'U', 'F', 'U’', 'F’']
                  ).map((move, index) => (
                    <span className="notation-key" key={`${move}-${index}`}>{move}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="module-one-lesson-footer">
          <span>
            {completedCount >= MODULE_THREE_LESSONS.length
              ? 'Módulo concluído'
              : `Aula ${selectedIndex + 1} de ${MODULE_THREE_LESSONS.length}`}
          </span>
          <Button
            type="button"
            variant="cube-accent"
            onClick={goToNextLesson}
          >
            {selectedIndex === MODULE_THREE_LESSONS.length - 1 ? 'Concluir módulo' : 'Próxima aula'}
            <span aria-hidden="true">{selectedIndex === MODULE_THREE_LESSONS.length - 1 ? '✓' : '→'}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function ModuleFourLearning({
  completedCount,
  onProgressChange,
  onCourseComplete,
}: {
  completedCount: number;
  onProgressChange: (count: number) => void;
  onCourseComplete: () => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(
    Math.min(completedCount, MODULE_FOUR_LESSONS.length - 1),
  );
  const lesson = MODULE_FOUR_LESSONS[selectedIndex];
  const lessonProgress = Math.round((completedCount / MODULE_FOUR_LESSONS.length) * 100);

  const getStatus = (index: number): LessonStatus => {
    if (index < completedCount) return 'completed';
    if (index === completedCount) return 'available';
    return 'locked';
  };

  const goToNextLesson = () => {
    if (selectedIndex === MODULE_FOUR_LESSONS.length - 1) {
      onProgressChange(MODULE_FOUR_LESSONS.length);
      onCourseComplete();
      return;
    }
    onProgressChange(Math.max(completedCount, selectedIndex + 1));
    setSelectedIndex(selectedIndex + 1);
  };

  const algorithm = [
    ['F', 'R', 'U', 'R’', 'U’', 'F’'],
    ['R', 'U', 'R’', 'U', 'R', 'U2', 'R’'],
    ['U', 'R', 'U’', 'L’', 'U', 'R’', 'U’', 'L'],
    ['R', 'U’', 'R', 'U', 'R', 'U', 'R', 'U’', 'R’', 'U’', 'R2'],
    ['U', 'U’', 'U2'],
  ][selectedIndex];

  return (
    <div className="module-one-learning module-four-learning">
      <section className="module-one-progress" aria-label="Progresso do módulo Última Camada">
        <div className="module-one-progress-copy">
          <div>
            <strong>Sua jornada neste módulo</strong>
            <span>{completedCount} de {MODULE_FOUR_LESSONS.length} aulas concluídas</span>
          </div>
          <strong>{lessonProgress}%</strong>
        </div>
        <ProgressBar value={lessonProgress} color="gradient" height={8} />
      </section>

      <nav className="module-one-lesson-nav" aria-label="Aulas do módulo Última Camada">
        {MODULE_FOUR_LESSONS.map((item, index) => {
          const status = getStatus(index);
          return (
            <button
              key={item.id}
              type="button"
              className={`module-one-lesson-nav-item status-${status} ${selectedIndex === index ? 'is-current' : ''}`}
              disabled={status === 'locked'}
              onClick={() => setSelectedIndex(index)}
              aria-current={selectedIndex === index ? 'step' : undefined}
              aria-label={`Aula ${index + 1}: ${item.title}. ${getStatusLabel(status)}`}
            >
              <span>{status === 'completed' ? '✓' : String(index + 1).padStart(2, '0')}</span>
            </button>
          );
        })}
      </nav>

      <Card variant="elevated" className="module-one-lesson-card">
        <div className="module-one-lesson-heading">
          <div>
            <span className="course-module-kicker">Aula {selectedIndex + 1} de {MODULE_FOUR_LESSONS.length}</span>
            <h3>{lesson.title}</h3>
          </div>
          <Badge variant="face" faceColor="blue" size="sm">{lesson.durationMinutes} min</Badge>
        </div>

        <p className="module-one-lesson-description">{lesson.description}</p>

        <div className={`module-two-visual module-three-visual module-four-visual module-four-visual--${selectedIndex}`}>
          <LessonAnimationVisual lesson={lesson} />
        </div>

        {lesson.notation && (
          <div className="module-one-notation" aria-label="Movimentos desta aula">
            <div className="module-one-notation-heading">
              <strong>Movimentos em foco</strong>
              <span>Leia a sequência da esquerda para a direita</span>
            </div>
            <div className="module-one-notation-grid">
              {lesson.notation.map(({ move, meaning }) => (
                <div className="module-one-notation-item" key={move}>
                  <span className="notation-key">{move}</span>
                  <span>{meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {lesson.example && (
          <div className="module-one-example">
            <span className="module-one-example-icon" aria-hidden="true">✦</span>
            <div>
              <strong>{selectedIndex === MODULE_FOUR_LESSONS.length - 1 ? 'Muito bem!' : 'Exemplo de sequência'}</strong>
              <p>{lesson.example}</p>
              <div className="module-four-algorithm" aria-label="Notação demonstrativa da aula">
                {algorithm.map((move, index) => (
                  <span className="notation-key" key={`${move}-${index}`}>{move}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="module-one-lesson-footer">
          <span>
            {completedCount >= MODULE_FOUR_LESSONS.length
              ? 'Última aula concluída'
              : `Aula ${selectedIndex + 1} de ${MODULE_FOUR_LESSONS.length}`}
          </span>
          <Button type="button" variant="cube-accent" onClick={goToNextLesson}>
            {selectedIndex === MODULE_FOUR_LESSONS.length - 1 ? 'Concluir curso' : 'Próxima aula'}
            <span aria-hidden="true">{selectedIndex === MODULE_FOUR_LESSONS.length - 1 ? '✓' : '→'}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCompletion({ onReview }: { onReview: () => void }) {
  return (
    <section className="course-completion" aria-labelledby="course-completion-title">
      <Card variant="elevated" className="course-completion-card">
        <span className="course-completion-confetti" aria-hidden="true">✦</span>
        <Badge variant="success">Curso concluído</Badge>
        <h2 id="course-completion-title">Você resolveu o caminho do 3×3 básico!</h2>
        <p>
          Parabéns por completar as quatro etapas do método de camadas. Você já conhece as peças,
          montou as camadas e aprendeu a finalizar o cubo.
        </p>
        <div className="course-completion-stats">
          <div><strong>4</strong><span>Módulos</span></div>
          <div><strong>19</strong><span>Aulas</span></div>
          <div><strong>100%</strong><span>Progresso</span></div>
        </div>
        <ProgressBar value={100} color="gradient" height={9} />
        <Button type="button" variant="outline" onClick={onReview}>Rever os módulos</Button>
        <span className="course-completion-footnote">Progresso demonstrativo desta sessão.</span>
      </Card>
    </section>
  );
}

function IntermediateModuleLearning({
  lessons,
  moduleTitle,
  visualTheme,
  completedCount,
  onProgressChange,
}: {
  lessons: ModuleOneLesson[];
  moduleTitle: string;
  visualTheme: 'efficiency' | 'recognition' | 'speed' | 'resolution';
  completedCount: number;
  onProgressChange: (count: number) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(
    Math.min(completedCount, lessons.length - 1),
  );
  const lesson = lessons[selectedIndex];
  const lessonProgress = Math.round(
    (completedCount / lessons.length) * 100,
  );

  const getStatus = (index: number): LessonStatus => {
    if (index < completedCount) return 'completed';
    if (index === completedCount) return 'available';
    return 'locked';
  };

  const goToNextLesson = () => {
    if (selectedIndex === lessons.length - 1) {
      onProgressChange(lessons.length);
      return;
    }
    onProgressChange(Math.max(completedCount, selectedIndex + 1));
    setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className={`module-one-learning intermediate-module-learning intermediate-module-learning--${visualTheme}`}>
      <section className="module-one-progress" aria-label={`Progresso do módulo ${moduleTitle}`}>
        <div className="module-one-progress-copy">
          <div>
            <strong>Sua jornada neste módulo</strong>
            <span>{completedCount} de {lessons.length} aulas concluídas</span>
          </div>
          <strong>{lessonProgress}%</strong>
        </div>
        <ProgressBar value={lessonProgress} color="gradient" height={8} />
      </section>

      <nav className="module-one-lesson-nav" aria-label={`Aulas de ${moduleTitle}`}>
        {lessons.map((item, index) => {
          const status = getStatus(index);
          return (
            <button
              key={item.id}
              type="button"
              className={`module-one-lesson-nav-item status-${status} ${selectedIndex === index ? 'is-current' : ''}`}
              disabled={status === 'locked'}
              onClick={() => setSelectedIndex(index)}
              aria-current={selectedIndex === index ? 'step' : undefined}
              aria-label={`Aula ${index + 1}: ${item.title}. ${getStatusLabel(status)}`}
            >
              <span>{status === 'completed' ? '✓' : String(index + 1).padStart(2, '0')}</span>
            </button>
          );
        })}
      </nav>

      <Card variant="elevated" className={`module-one-lesson-card intermediate-lesson-card intermediate-lesson-card--${visualTheme}`}>
        <div className="module-one-lesson-heading">
          <div>
            <span className="course-module-kicker">Aula {selectedIndex + 1} de {lessons.length}</span>
            <h3>{lesson.title}</h3>
          </div>
          <Badge variant="face" faceColor="blue" size="sm">{lesson.durationMinutes} min</Badge>
        </div>

        <p className="module-one-lesson-description">{lesson.description}</p>

        <div className={`module-two-visual intermediate-lesson-visual intermediate-lesson-visual--${selectedIndex} intermediate-lesson-visual--${visualTheme}`}>
          <LessonAnimationVisual lesson={lesson} />
          <div className="intermediate-visual-tip">
            <span className="intermediate-tip-dot" />
            <span>
              {visualTheme === 'efficiency' && selectedIndex === 2
                ? 'Pegada relaxada, giros controlados'
                : visualTheme === 'recognition'
                  ? 'Observe o padrão antes de executar'
                  : visualTheme === 'speed'
                    ? 'Precisão e ritmo constante'
                    : visualTheme === 'resolution'
                      ? 'Planejamento, menos correções'
                    : 'Observe antes de executar'}
            </span>
          </div>
        </div>

        {visualTheme === 'speed' && (
          <div className="intermediate-speed-preparation" aria-label="Preparação para treinos de tempo">
            <span aria-hidden="true">◷</span>
            <div>
              <strong>Treinos de tempo</strong>
              <span>Espaço preparado para cronômetro e práticas cronometradas · Em breve</span>
            </div>
            <Badge variant="warning" size="sm">Em breve</Badge>
          </div>
        )}

        {lesson.notation && (
          <div className="module-one-notation" aria-label="Notação destacada da aula">
            <div className="module-one-notation-heading">
              <strong>Notação em foco</strong>
              <span>Uma ideia por movimento</span>
            </div>
            <div className="module-one-notation-grid">
              {lesson.notation.map(({ move, meaning }) => (
                <div className="module-one-notation-item" key={`${move}-${meaning}`}>
                  <span className="notation-key">{move}</span>
                  <span>{meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {lesson.example && (
          <div className="module-one-example">
            <span className="module-one-example-icon" aria-hidden="true">✦</span>
            <div>
              <strong>Exemplo prático</strong>
              <p>{lesson.example}</p>
              {lesson.algorithm ? (
                <div className="intermediate-algorithm">
                  {lesson.algorithm.map((move, index) => (
                    <span className={`notation-key ${move === '·' ? 'algorithm-separator' : ''}`} key={`${move}-${index}`}>
                      {move}
                    </span>
                  ))}
                </div>
              ) : visualTheme === 'efficiency' && selectedIndex === 0 ? (
                <div className="intermediate-algorithm">
                  {['R', 'U', 'R’', 'U’'].map((move) => (
                    <span className="notation-key" key={move}>{move}</span>
                  ))}
                </div>
              ) : visualTheme === 'efficiency' && selectedIndex === 4 ? (
                <div className="intermediate-algorithm">
                  <span className="notation-key">U U</span>
                  <span className="intermediate-equivalence">=</span>
                  <span className="notation-key">U2</span>
                  <span className="intermediate-equivalence">·</span>
                  <span className="notation-key">U U’</span>
                  <span className="intermediate-equivalence">=</span>
                  <span className="notation-key">—</span>
                </div>
              ) : null}
            </div>
          </div>
        )}

        <div className="module-one-lesson-footer">
          <span>
            {completedCount >= lessons.length
              ? 'Módulo concluído'
              : `Aula ${selectedIndex + 1} de ${lessons.length}`}
          </span>
          <Button type="button" variant="cube-accent" onClick={goToNextLesson}>
            {selectedIndex === lessons.length - 1 ? 'Concluir módulo' : 'Próxima aula'}
            <span aria-hidden="true">{selectedIndex === lessons.length - 1 ? '✓' : '→'}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseStructurePage() {
  const [selectedLevel, setSelectedLevel] = useState<CubeLevel>('basic');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [moduleOneCompletedCount, setModuleOneCompletedCount] = useState(0);
  const [moduleTwoCompletedCount, setModuleTwoCompletedCount] = useState(0);
  const [moduleThreeCompletedCount, setModuleThreeCompletedCount] = useState(0);
  const [moduleFourCompletedCount, setModuleFourCompletedCount] = useState(0);
  const [intermediateModuleOneCompletedCount, setIntermediateModuleOneCompletedCount] = useState(0);
  const [intermediateModuleTwoCompletedCount, setIntermediateModuleTwoCompletedCount] = useState(0);
  const [intermediateModuleThreeCompletedCount, setIntermediateModuleThreeCompletedCount] = useState(0);
  const [intermediateModuleFourCompletedCount, setIntermediateModuleFourCompletedCount] = useState(0);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const course = ALL_COURSES.find(({ id }) => id === LEVEL_COURSE_IDS[selectedLevel]);
  const modules = useMemo(
    () =>
      ALL_MODULES.filter((module) => module.courseId === LEVEL_COURSE_IDS[selectedLevel]).sort(
        (a, b) => a.order - b.order,
      ),
    [selectedLevel],
  );
  const lessons = useMemo(
    () =>
      ALL_LESSONS.filter((lesson) => lesson.courseId === LEVEL_COURSE_IDS[selectedLevel]).sort(
        (a, b) => a.order - b.order,
      ),
    [selectedLevel],
  );

  const currentModuleId =
    activeModuleId && modules.some(({ id }) => id === activeModuleId)
      ? activeModuleId
      : modules[0]?.id;
  const activeModule = modules.find(({ id }) => id === currentModuleId);
  const activeModuleLessons = lessons.filter((lesson) => lesson.moduleId === currentModuleId);
  const replacedModuleLessonIds = new Set([
    ...(ALL_MODULES.find(({ id }) => id === MODULE_ONE_ID)?.lessonIds ?? []),
    ...(ALL_MODULES.find(({ id }) => id === MODULE_TWO_ID)?.lessonIds ?? []),
    ...(ALL_MODULES.find(({ id }) => id === MODULE_THREE_ID)?.lessonIds ?? []),
    ...(ALL_MODULES.find(({ id }) => id === MODULE_FOUR_ID)?.lessonIds ?? []),
  ]);
  const replacedIntermediateLessonIds = new Set([
    ...(ALL_MODULES.find(({ id }) => id === MODULE_INTERMEDIATE_ONE_ID)?.lessonIds ?? []),
    ...(ALL_MODULES.find(({ id }) => id === MODULE_INTERMEDIATE_TWO_ID)?.lessonIds ?? []),
    ...(ALL_MODULES.find(({ id }) => id === MODULE_INTERMEDIATE_THREE_ID)?.lessonIds ?? []),
    ...(ALL_MODULES.find(({ id }) => id === MODULE_INTERMEDIATE_FOUR_ID)?.lessonIds ?? []),
  ]);
  const totalCourseLessons =
    selectedLevel === 'basic'
      ? lessons.filter(({ id }) => !replacedModuleLessonIds.has(id)).length +
        MODULE_ONE_LESSONS.length +
        MODULE_TWO_LESSONS.length +
        MODULE_THREE_LESSONS.length +
        MODULE_FOUR_LESSONS.length
      : selectedLevel === 'intermediate'
        ? lessons.filter(({ id }) => !replacedIntermediateLessonIds.has(id)).length +
          MODULE_INTERMEDIATE_ONE_LESSONS.length +
          MODULE_INTERMEDIATE_TWO_LESSONS.length +
          MODULE_INTERMEDIATE_THREE_LESSONS.length +
          MODULE_INTERMEDIATE_FOUR_LESSONS.length
        : lessons.length;
  const completedLessons =
    selectedLevel === 'basic'
      ? moduleOneCompletedCount +
        moduleTwoCompletedCount +
        moduleThreeCompletedCount +
        moduleFourCompletedCount
      : selectedLevel === 'intermediate'
        ? intermediateModuleOneCompletedCount +
          intermediateModuleTwoCompletedCount +
          intermediateModuleThreeCompletedCount +
          intermediateModuleFourCompletedCount
        : 0;
  const progress = totalCourseLessons
    ? Math.round((completedLessons / totalCourseLessons) * 100)
    : 0;
  const selectedLesson = lessons.find(({ id }) => id === selectedLessonId);
  const nextLesson = lessons.find((lesson) => getLessonStatus(lesson) === 'available');

  const getLessonsForModule = (module: CourseModule) =>
    module.id === MODULE_ONE_ID
      ? MODULE_ONE_LESSONS
      : module.id === MODULE_TWO_ID
        ? MODULE_TWO_LESSONS
        : module.id === MODULE_THREE_ID
          ? MODULE_THREE_LESSONS
        : module.id === MODULE_FOUR_ID
          ? MODULE_FOUR_LESSONS
          : module.id === MODULE_INTERMEDIATE_ONE_ID
            ? MODULE_INTERMEDIATE_ONE_LESSONS
            : module.id === MODULE_INTERMEDIATE_TWO_ID
              ? MODULE_INTERMEDIATE_TWO_LESSONS
              : module.id === MODULE_INTERMEDIATE_THREE_ID
                ? MODULE_INTERMEDIATE_THREE_LESSONS
                : module.id === MODULE_INTERMEDIATE_FOUR_ID
                  ? MODULE_INTERMEDIATE_FOUR_LESSONS
          : lessons.filter((lesson) => lesson.moduleId === module.id);

  const selectLevel = (level: CubeLevel) => {
    setSelectedLevel(level);
    setActiveModuleId(null);
    setSelectedLessonId(null);
    setModuleOneCompletedCount(0);
    setModuleTwoCompletedCount(0);
    setModuleThreeCompletedCount(0);
    setModuleFourCompletedCount(0);
    setIntermediateModuleOneCompletedCount(0);
    setIntermediateModuleTwoCompletedCount(0);
    setIntermediateModuleThreeCompletedCount(0);
    setIntermediateModuleFourCompletedCount(0);
    setCourseCompleted(false);
  };

  if (!course) return null;

  return (
    <div className="course-structure-page">
      <div className="container course-structure-shell">
        <header className="course-structure-header">
          <div className="course-structure-heading">
            <span className="hero-eyebrow">Trilha de aprendizado · Cubo 3×3</span>
            <h1>Aprenda o 3×3, etapa por etapa.</h1>
            <p>
              {selectedLevel === 'basic'
                ? 'Comece pelo método de camadas e construa sua primeira resolução com segurança.'
                : course.description}
            </p>
          </div>

          <Card variant="elevated" className="course-overview-card">
            <div className="course-overview-top">
              <div>
                <span className="course-overview-label">Seu progresso</span>
                <strong>{progress}%</strong>
              </div>
              <Badge variant="face" faceColor="blue" size="sm">
                {LEVEL_LABELS[selectedLevel]}
              </Badge>
            </div>
            <ProgressBar value={progress} color="gradient" height={9} />
            <div className="course-overview-foot">
              <span>{completedLessons} de {totalCourseLessons} aulas concluídas</span>
              <span>{course.estimatedTotalHours}h estimadas</span>
            </div>
          </Card>
        </header>

        <section className="course-level-section" aria-label="Seleção de nível">
          <div className="course-level-tabs">
            {LEVELS.map((level) => {
              const isSelected = selectedLevel === level.id;
              const isFuture = level.id !== 'basic';
              return (
                <button
                  key={level.id}
                  type="button"
                  className={`course-level-tab ${isSelected ? 'is-selected' : ''} ${isFuture ? 'is-future' : ''}`}
                  onClick={() => selectLevel(level.id)}
                  aria-pressed={isSelected}
                >
                  <span className="course-level-tab-copy">
                    <strong>{level.label}</strong>
                    <span>{level.description}</span>
                  </span>
                  {isFuture && <Badge variant="warning" size="sm">Em breve</Badge>}
                  {!isFuture && <Badge variant="success" size="sm">Disponível</Badge>}
                </button>
              );
            })}
          </div>
        </section>

        {selectedLevel === 'basic' && courseCompleted ? (
          <CourseCompletion
            onReview={() => {
              setCourseCompleted(false);
              setActiveModuleId(MODULE_FOUR_ID);
            }}
          />
        ) : selectedLevel !== 'advanced' ? (
          <div className="course-learning-layout">
            <aside className="course-module-navigation" aria-label="Navegação entre módulos">
              <div className="course-module-navigation-heading">
                <h2>Módulos</h2>
                <span>{modules.length} etapas</span>
              </div>
              <nav className="course-module-list">
                {modules.map((module) => {
                  const moduleLessons = getLessonsForModule(module);
                  const isFutureModule =
                    selectedLevel === 'intermediate' &&
                    module.id !== MODULE_INTERMEDIATE_ONE_ID &&
                    module.id !== MODULE_INTERMEDIATE_TWO_ID &&
                    module.id !== MODULE_INTERMEDIATE_THREE_ID &&
                    module.id !== MODULE_INTERMEDIATE_FOUR_ID;
                  const moduleCompleted = isFutureModule
                    ? false
                    : module.id === MODULE_ONE_ID
                      ? moduleOneCompletedCount === MODULE_ONE_LESSONS.length
                      : module.id === MODULE_TWO_ID
                        ? moduleTwoCompletedCount === MODULE_TWO_LESSONS.length
                      : module.id === MODULE_THREE_ID
                        ? moduleThreeCompletedCount === MODULE_THREE_LESSONS.length
                        : module.id === MODULE_FOUR_ID
                          ? moduleFourCompletedCount === MODULE_FOUR_LESSONS.length
                            : module.id === MODULE_INTERMEDIATE_ONE_ID
                              ? intermediateModuleOneCompletedCount === MODULE_INTERMEDIATE_ONE_LESSONS.length
                              : module.id === MODULE_INTERMEDIATE_TWO_ID
                                ? intermediateModuleTwoCompletedCount === MODULE_INTERMEDIATE_TWO_LESSONS.length
                                : module.id === MODULE_INTERMEDIATE_THREE_ID
                                  ? intermediateModuleThreeCompletedCount === MODULE_INTERMEDIATE_THREE_LESSONS.length
                                  : module.id === MODULE_INTERMEDIATE_FOUR_ID
                                    ? intermediateModuleFourCompletedCount === MODULE_INTERMEDIATE_FOUR_LESSONS.length
                              : lessons
                                .filter((lesson) => lesson.moduleId === module.id)
                                .every((lesson) => getLessonStatus(lesson) === 'completed');
                  return (
                    <button
                        key={module.id}
                        type="button"
                        className={`course-module-nav-item ${module.id === currentModuleId ? 'is-active' : ''} ${isFutureModule ? 'is-locked' : ''}`}
                        disabled={isFutureModule}
                        onClick={() => {
                          setActiveModuleId(module.id);
                          setSelectedLessonId(null);
                      }}
                      aria-current={module.id === currentModuleId ? 'step' : undefined}
                    >
                      <span className={`course-module-number ${moduleCompleted ? 'is-complete' : ''}`}>
                        {moduleCompleted ? '✓' : String(module.order).padStart(2, '0')}
                      </span>
                      <span className="course-module-nav-copy">
                        <strong>
                          {module.id === MODULE_ONE_ID
                            ? 'Conhecendo o Cubo'
                            : module.id === MODULE_TWO_ID
                              ? 'Primeira Camada'
                              : module.id === MODULE_THREE_ID
                                ? 'Segunda Camada'
                                : module.id === MODULE_FOUR_ID
                                  ? 'Última Camada'
                                      : module.id === MODULE_INTERMEDIATE_ONE_ID
                                        ? 'Eficiência e domínio dos movimentos'
                                        : module.id === MODULE_INTERMEDIATE_TWO_ID
                                          ? 'Reconhecimento e Algoritmos'
                                          : module.id === MODULE_INTERMEDIATE_THREE_ID
                                            ? 'Velocidade e Execução'
                                            : module.id === MODULE_INTERMEDIATE_FOUR_ID
                                              ? 'Resolução Mais Eficiente'
                                      : module.title}
                        </strong>
                        <span>
                          {isFutureModule
                                ? 'Em breve'
                                : `${moduleLessons.length} ${moduleLessons.length === 1 ? 'aula' : 'aulas'}`}
                        </span>
                      </span>
                      <span className="course-module-chevron" aria-hidden="true">
                        {isFutureModule ? '⌑' : '›'}
                      </span>
                    </button>
                  );
                })}
              </nav>
              <div className="course-method-note">
                <span className="course-method-icon" aria-hidden="true">✦</span>
                <div>
                  <strong>{selectedLevel === 'intermediate' ? 'Eficiência e domínio' : 'Método de camadas'}</strong>
                  <p>
                    {selectedLevel === 'intermediate'
                      ? 'Refine seus movimentos antes de avançar para o CFOP.'
                      : 'Uma sequência clara para resolver o cubo inteiro.'}
                  </p>
                </div>
              </div>
            </aside>

            <section className="course-module-content" aria-labelledby="active-module-title">
              {activeModule && (
                <>
                  <div className="course-module-content-heading">
                    <div>
                      <span className="course-module-kicker">Módulo {String(activeModule.order).padStart(2, '0')}</span>
                      <h2 id="active-module-title">
                        {activeModule.id === MODULE_ONE_ID
                          ? 'Conhecendo o Cubo'
                          : activeModule.id === MODULE_TWO_ID
                            ? 'Primeira Camada'
                            : activeModule.id === MODULE_THREE_ID
                              ? 'Segunda Camada'
                              : activeModule.id === MODULE_FOUR_ID
                                ? 'Última Camada'
                                : activeModule.id === MODULE_INTERMEDIATE_ONE_ID
                                  ? 'Eficiência e domínio dos movimentos'
                                  : activeModule.id === MODULE_INTERMEDIATE_TWO_ID
                                    ? 'Reconhecimento e Algoritmos'
                                    : activeModule.id === MODULE_INTERMEDIATE_THREE_ID
                                      ? 'Velocidade e Execução'
                                      : activeModule.id === MODULE_INTERMEDIATE_FOUR_ID
                                        ? 'Resolução Mais Eficiente'
                                : activeModule.title}
                      </h2>
                      <p>
                        {activeModule.id === MODULE_ONE_ID
                          ? 'Entenda as peças, as faces e a linguagem usada para descrever os giros.'
                          : activeModule.id === MODULE_TWO_ID
                            ? 'Construa a cruz branca, alinhe as peças e complete a primeira camada passo a passo.'
                          : activeModule.id === MODULE_THREE_ID
                            ? 'Aprenda a identificar, alinhar e inserir as peças de meio para completar a segunda camada.'
                            : activeModule.id === MODULE_FOUR_ID
                              ? 'Oriente a face amarela, posicione as peças e finalize sua primeira resolução completa.'
                              : activeModule.id === MODULE_INTERMEDIATE_ONE_ID
                                ? 'Refine seus fundamentos e desenvolva fluidez, controle e economia de movimentos.'
                                : activeModule.id === MODULE_INTERMEDIATE_TWO_ID
                                  ? 'Aprenda a identificar padrões e executar sequências com compreensão e confiança.'
                                  : activeModule.id === MODULE_INTERMEDIATE_THREE_ID
                                    ? 'Desenvolva ritmo, controle e fluidez para executar as etapas com menos pausas.'
                                    : activeModule.id === MODULE_INTERMEDIATE_FOUR_ID
                                      ? 'Analise suas soluções, planeje com antecedência e reduza movimentos desnecessários.'
                              : activeModule.description}
                      </p>
                    </div>
                    <Badge variant="face" faceColor="blue" size="sm">
                      {activeModule.estimatedMinutes} min
                    </Badge>
                  </div>

                  {activeModule.id !== MODULE_ONE_ID &&
                    activeModule.id !== MODULE_INTERMEDIATE_ONE_ID &&
                    nextLesson &&
                    activeModuleLessons.some(({ id }) => id === nextLesson.id) && (
                    <Card variant="elevated" className="next-lesson-callout">
                      <span className="next-lesson-indicator" aria-hidden="true">→</span>
                      <div>
                        <span>PRÓXIMA AULA</span>
                        <strong>{nextLesson.title}</strong>
                      </div>
                      <Badge variant="success" size="sm">Continue por aqui</Badge>
                    </Card>
                  )}

                  {activeModule.id === MODULE_ONE_ID ? (
                    <ModuleOneLearning
                      completedCount={moduleOneCompletedCount}
                      onProgressChange={setModuleOneCompletedCount}
                    />
                  ) : activeModule.id === MODULE_TWO_ID ? (
                    <ModuleTwoLearning
                      completedCount={moduleTwoCompletedCount}
                      onProgressChange={setModuleTwoCompletedCount}
                    />
                  ) : activeModule.id === MODULE_THREE_ID ? (
                    <ModuleThreeLearning
                      completedCount={moduleThreeCompletedCount}
                      onProgressChange={setModuleThreeCompletedCount}
                    />
                  ) : activeModule.id === MODULE_FOUR_ID ? (
                    <ModuleFourLearning
                      completedCount={moduleFourCompletedCount}
                      onProgressChange={setModuleFourCompletedCount}
                      onCourseComplete={() => {
                        setModuleOneCompletedCount(MODULE_ONE_LESSONS.length);
                        setModuleTwoCompletedCount(MODULE_TWO_LESSONS.length);
                        setModuleThreeCompletedCount(MODULE_THREE_LESSONS.length);
                        setModuleFourCompletedCount(MODULE_FOUR_LESSONS.length);
                        setCourseCompleted(true);
                      }}
                    />
                  ) : activeModule.id === MODULE_INTERMEDIATE_ONE_ID ? (
                    <IntermediateModuleLearning
                      key={MODULE_INTERMEDIATE_ONE_ID}
                      lessons={MODULE_INTERMEDIATE_ONE_LESSONS}
                      moduleTitle="Eficiência e domínio dos movimentos"
                      visualTheme="efficiency"
                      completedCount={intermediateModuleOneCompletedCount}
                      onProgressChange={setIntermediateModuleOneCompletedCount}
                    />
                  ) : activeModule.id === MODULE_INTERMEDIATE_TWO_ID ? (
                    <IntermediateModuleLearning
                      key={MODULE_INTERMEDIATE_TWO_ID}
                      lessons={MODULE_INTERMEDIATE_TWO_LESSONS}
                      moduleTitle="Reconhecimento e Algoritmos"
                      visualTheme="recognition"
                      completedCount={intermediateModuleTwoCompletedCount}
                      onProgressChange={setIntermediateModuleTwoCompletedCount}
                    />
                  ) : activeModule.id === MODULE_INTERMEDIATE_THREE_ID ? (
                    <IntermediateModuleLearning
                      key={MODULE_INTERMEDIATE_THREE_ID}
                      lessons={MODULE_INTERMEDIATE_THREE_LESSONS}
                      moduleTitle="Velocidade e Execução"
                      visualTheme="speed"
                      completedCount={intermediateModuleThreeCompletedCount}
                      onProgressChange={setIntermediateModuleThreeCompletedCount}
                    />
                  ) : activeModule.id === MODULE_INTERMEDIATE_FOUR_ID ? (
                    <IntermediateModuleLearning
                      key={MODULE_INTERMEDIATE_FOUR_ID}
                      lessons={MODULE_INTERMEDIATE_FOUR_LESSONS}
                      moduleTitle="Resolução Mais Eficiente"
                      visualTheme="resolution"
                      completedCount={intermediateModuleFourCompletedCount}
                      onProgressChange={setIntermediateModuleFourCompletedCount}
                    />
                  ) : (
                    <>
                      <div className="course-lesson-list">
                        {activeModuleLessons.map((lesson) => {
                          const status = getLessonStatus(lesson);
                          const isNext = lesson.id === nextLesson?.id;
                          return (
                            <button
                              type="button"
                              key={lesson.id}
                              className={`course-lesson-card ${status === 'locked' ? 'is-locked' : ''} ${isNext ? 'is-next' : ''} ${selectedLessonId === lesson.id ? 'is-selected' : ''}`}
                              disabled={status === 'locked'}
                              onClick={() => setSelectedLessonId(lesson.id)}
                            >
                              <span className={`course-lesson-number status-${status}`}>
                                {status === 'available' ? String(lesson.order).padStart(2, '0') : getStatusIcon(status)}
                              </span>
                              <span className="course-lesson-main">
                                <span className="course-lesson-title-row">
                                  <strong>{lesson.title}</strong>
                                  {isNext && <span className="course-next-label">PRÓXIMA</span>}
                                </span>
                                <span className="course-lesson-description">{lesson.description}</span>
                                <span className="course-lesson-meta">
                                  <Badge level="basic" size="sm">Básico</Badge>
                                  <span>{lesson.durationMinutes} min</span>
                                </span>
                              </span>
                              <span className={`course-lesson-status status-${status}`}>
                                <span aria-hidden="true">{getStatusIcon(status)}</span>
                                {getStatusLabel(status)}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {selectedLesson && activeModuleLessons.some(({ id }) => id === selectedLesson.id) && (
                        <Card variant="outline" className="lesson-content-placeholder">
                          <span className="lesson-placeholder-icon" aria-hidden="true">▤</span>
                          <div>
                            <span>ESPAÇO DE APRENDIZADO</span>
                            <strong>{selectedLesson.title}</strong>
                            <p>
                              Esta área está preparada para receber explicações guiadas, animações do
                              cubo e algoritmos da aula.
                            </p>
                          </div>
                        </Card>
                      )}
                    </>
                  )}

                  <div className="course-module-pagination">
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={activeModule.order === 1}
                      onClick={() => setActiveModuleId(modules[activeModule.order - 2]?.id ?? null)}
                    >
                      ← Módulo anterior
                    </Button>
                    <span>{activeModule.order} / {modules.length}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={
                        activeModule.order === modules.length ||
                        (selectedLevel === 'intermediate' && activeModule.order >= 4)
                      }
                      onClick={() => setActiveModuleId(modules[activeModule.order]?.id ?? null)}
                    >
                      Próximo módulo →
                    </Button>
                  </div>
                </>
              )}
            </section>
          </div>
        ) : (
          <section className="course-future-level" aria-live="polite">
            <Card variant="elevated" className="course-future-card">
              <span className="course-future-icon" aria-hidden="true">⌑</span>
              <Badge variant="warning" size="sm">Progressão futura</Badge>
              <h2>O nível {LEVEL_LABELS[selectedLevel]} vem a seguir.</h2>
              <p>{course.subtitle}</p>
              <div className="course-future-path">
                {modules.map((module, index) => (
                  <div className="course-future-module" key={module.id}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <strong>{module.title}</strong>
                      <small>{module.description}</small>
                    </div>
                    <span className="course-future-lock" aria-label="Em breve">⌑</span>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={() => selectLevel('basic')}>
                Voltar ao nível básico
              </Button>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}

export default CourseStructurePage;
