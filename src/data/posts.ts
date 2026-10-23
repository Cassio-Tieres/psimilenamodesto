import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import natureLeaves from "@/assets/nature-leaves.jpg";
import therapyCup from "@/assets/therapy-cup.jpg";

export type Category =
  | "Ansiedade e autocobrança"
  | "Relações"
  | "Exaustão emocional"
  | "Saúde mental no cotidiano"
  | "Reflexões clínicas"
  | "Psicoterapia";

export const categories: Category[] = [
  "Ansiedade e autocobrança",
  "Relações",
  "Exaustão emocional",
  "Saúde mental no cotidiano",
  "Reflexões clínicas",
  "Psicoterapia",
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readingTime: string;
  cover: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "o-cansaco-que-nao-passa-com-o-fim-de-semana",
    title: "O cansaço que não passa com o fim de semana",
    excerpt:
      "Quando o descanso já não restaura, talvez não seja sono o que falta é um modo de existir mais próximo de si.",
    category: "Exaustão emocional",
    date: "12 de março, 2025",
    readingTime: "6 min",
    cover: blog3,
    body: [
      "Há um cansaço que não cabe na palavra cansaço. Ele resiste ao fim de semana, ao feriado prolongado, às férias planejadas com cuidado. É o cansaço de quem segue cumprindo expectativas que, em algum momento, deixaram de ser as próprias.",
      "Na clínica, escuto com frequência relatos parecidos: pessoas que dormem oito horas e acordam exaustas, que conseguem produzir mas não conseguem descansar, que olham para a própria vida como quem assiste a um filme de longe.",
      "A exaustão emocional raramente fala em voz alta. Ela aparece nos pequenos sinais a irritação que cresce sem motivo aparente, a vontade de não fazer nada, a sensação de estar levando uma vida que parece um pouco maior do que se aguenta.",
      "Talvez o convite, aqui, não seja descansar mais. Seja descansar de outro jeito: parar de empurrar a própria existência para frente como uma tarefa, e voltar a habitá-la como experiência.",
    ],
  },
  {
    slug: "ansiedade-nao-e-falha-de-carater",
    title: "Ansiedade não é falha de caráter",
    excerpt:
      "Sentir muito não é fraqueza. É uma forma legítima embora cansativa de estar atento ao mundo.",
    category: "Ansiedade e autocobrança",
    date: "28 de fevereiro, 2025",
    readingTime: "5 min",
    cover: blog1,
    body: [
      "Há uma cultura silenciosa que ensina, desde cedo, que a ansiedade é um problema a ser resolvido preferencialmente sozinho, com produtividade e disciplina.",
      "Mas a ansiedade não é defeito. É uma forma de estar no mundo: hiperatenta, antecipatória, sensível ao que pode vir. Em doses humanas, ela é vida pulsando. Em doses excessivas, é um corpo pedindo socorro.",
      "O trabalho terapêutico, aqui, não é o de calar o que pulsa. É o de escutar o que essa pulsação tenta dizer.",
    ],
  },
  {
    slug: "estar-com-o-outro-sem-se-perder",
    title: "Estar com o outro sem se perder",
    excerpt:
      "O equilíbrio delicado entre presença e individualidade nas relações que importam.",
    category: "Relações",
    date: "14 de fevereiro, 2025",
    readingTime: "7 min",
    cover: blog2,
    body: [
      "Amar é, de algum modo, ser tocado pelo outro. Mas há uma diferença entre ser tocado e ser apagado. É nesse limite tênue que tantas relações se desorganizam.",
      "Quando me dissolvo no outro, deixo de ser presença. Viro reflexo. E o que parecia entrega vira ausência.",
      "A clínica nos lembra: estar com alguém exige antes estar consigo.",
    ],
  },
  {
    slug: "o-corpo-como-paisagem-da-mente",
    title: "O corpo como paisagem da mente",
    excerpt:
      "Pequenos sinais corporais como cartografia de uma vida emocional que pede atenção.",
    category: "Saúde mental no cotidiano",
    date: "30 de janeiro, 2025",
    readingTime: "5 min",
    cover: natureLeaves,
    body: [
      "O corpo fala primeiro. Antes da angústia ter nome, antes do pensamento se organizar em frase, há um ombro tenso, uma respiração curta, um aperto no peito.",
      "Aprender a escutar o corpo é uma forma de devolver dignidade ao que sentimos. Não como sintoma a calar, mas como linguagem a compreender.",
    ],
  },
  {
    slug: "fenomenologia-uma-forma-de-escuta",
    title: "Fenomenologia: uma forma de escuta",
    excerpt:
      "O que significa, na prática clínica, partir da experiência vivida e não dos rótulos.",
    category: "Reflexões clínicas",
    date: "10 de janeiro, 2025",
    readingTime: "8 min",
    cover: therapyCup,
    body: [
      "A clínica fenomenológico-existencial parte de uma escolha simples e radical: começar pela experiência. Não pelo diagnóstico, não pela teoria, não pela explicação. Pela vivência tal como ela aparece.",
      "Isso muda o modo como se escuta. Em vez de procurar onde encaixar o que o outro traz, abre-se um espaço para que aquilo possa, primeiro, existir entre nós.",
      "É uma forma de cuidado que se recusa a transformar pessoas em casos.",
    ],
  },
  {
    slug: "primeira-sessao-o-que-esperar",
    title: "Primeira sessão: o que esperar",
    excerpt:
      "Algumas notas suaves para quem está pensando em começar e ainda não sabe bem o que dizer.",
    category: "Psicoterapia",
    date: "20 de dezembro, 2024",
    readingTime: "4 min",
    cover: blog4,
    body: [
      "A primeira sessão não exige preparação. Você não precisa chegar com uma fala pronta, com um motivo claro, com uma narrativa organizada.",
      "Pode chegar como está. Em dúvida, em silêncio, em excesso. Tudo isso já é, em si, uma forma de começar.",
      "O que fazemos juntos, a partir daí, é construído lentamente no ritmo do que pode ser dito.",
    ],
  },
];
