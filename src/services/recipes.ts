export interface MealPlan {
  cafe: string;
  almoco: string;
  lanche: string;
  jantar: string;
}

const bancoReceitas: Record<number, MealPlan> = {
    1: { cafe: '🌅 Omelete de 4 claras + 1 ovo inteiro + espinafre (25g prot, 220 kcal) – Bata, frite em frigideira antiaderente.', almoco: '☀️ Frango grelhado com brócolis e azeite (35g prot, 320 kcal) – Tempere peito de frango, grelhe + brócolis vapor.', lanche: '🌤️ Atum em lata com abacate e tomate (30g prot, 280 kcal) – Misture cru, tempere limão.', jantar: '🌙 Salada de grão-de-bico com atum e ovo cozido (28g prot, 300 kcal) – Misture tudo + folhas verdes.' },
    2: { cafe: '🌅 Ovos mexidos com queijo cottage e tomate (30g prot, 250 kcal) – Mexa ovos + cottage + tomate.', almoco: '☀️ Lentilha com frango desfiado e cenoura (32g prot, 340 kcal) – Cozinhe juntos.', lanche: '🌤️ Sardinha em lata com salada de folhas e azeite (25g prot, 260 kcal) – Misture sardinha + folhas + tomate.', jantar: '🌙 Wrap de alface com frango grelhado e cottage (35g prot, 280 kcal) – Use alface como wrap.' },
    3: { cafe: '🌅 Omelete de atum com cebola e pimentão (30g prot, 270 kcal) – Bata ovos + atum + vegetais.', almoco: '☀️ Peito de peru grelhado com abobrinha (28g prot, 250 kcal) – Grelhe peru + abobrinha.', lanche: '🌤️ Frango desfiado com couve refogada (35g prot, 310 kcal) – Refogue couve + frango desfiado.', jantar: '🌙 Ovos cozidos com abacate (25g prot, 280 kcal) – Cozinhe ovos, amasse abacate.' },
    4: { cafe: '🌅 Grão-de-bico temperado com alho e ervas (22g prot, 240 kcal) – Refogue grão-de-bico.', almoco: '☀️ Atum com pepino e iogurte natural (30g prot, 220 kcal) – Misture atum + pepino + iogurte.', lanche: '🌤️ Queijo cottage com tomate cereja e ervas (25g prot, 180 kcal) – Misture tudo cru.', jantar: '🌙 Sardinha com batata-doce assada (28g prot, 320 kcal) – Asse batata-doce + sardinha.' },
    5: { cafe: '🌅 Omelete de espinafre com queijo minas light (30g prot, 260 kcal) – Bata ovos + espinafre + queijo.', almoco: '☀️ Frango com cenoura ralada e iogurte (35g prot, 300 kcal) – Misture frango cozido + cenoura + iogurte.', lanche: '🌤️ Lentilha com ovos cozidos (28g prot, 290 kcal) – Cozinhe lentilha + ovos.', jantar: '🌙 Atum com abobrinha grelhada (30g prot, 250 kcal) – Grelhe abobrinha + atum.' },
    6: { cafe: '🌅 Ovos mexidos com brócolis (25g prot, 230 kcal) – Mexa ovos + brócolis.', almoco: '☀️ Grão-de-bico com frango e tomate (32g prot, 330 kcal) – Misture grão-de-bico + frango.', lanche: '🌤️ Peito de frango com couve-flor (35g prot, 310 kcal) – Grelhe frango + couve-flor vapor.', jantar: '🌙 Sardinha com salada de pepino (25g prot, 240 kcal) – Misture sardinha + pepino.' },
    7: { cafe: '🌅 Cottage com pepino e ervas (25g prot, 170 kcal) – Misture cottage + pepino picado.', almoco: '☀️ Omelete de pimentão com atum (30g prot, 270 kcal) – Bata ovos + pimentão + atum.', lanche: '🌤️ Frango desfiado com abacate (35g prot, 340 kcal) – Misture frango + abacate.', jantar: '🌙 Lentilha com cenoura e ovos (28g prot, 290 kcal) – Cozinhe lentilha + cenoura + ovos.' },
    8: { cafe: '🌅 Atum com folhas verdes e azeite (30g prot, 260 kcal) – Misture atum + folhas.', almoco: '☀️ Peru grelhado com espinafre (28g prot, 250 kcal) – Grelhe peru + espinafre.', lanche: '🌤️ Ovos cozidos com cottage (30g prot, 240 kcal) – Cozinhe ovos + misture cottage.', jantar: '🌙 Grão-de-bico com sardinha (25g prot, 280 kcal) – Misture grão-de-bico + sardinha.' },
    9: { cafe: '🌅 Frango com abobrinha e tomate (35g prot, 300 kcal) – Grelhe tudo.', almoco: '☀️ Omelete de queijo minas com tomate (30g prot, 260 kcal) – Bata ovos + queijo + tomate.', lanche: '🌤️ Lentilha com atum (28g prot, 290 kcal) – Misture lentilha cozida + atum.', jantar: '🌙 Sardinha com couve refogada (25g prot, 260 kcal) – Refogue couve + sardinha.' },
    10: { cafe: '🌅 Cottage com cenoura ralada (25g prot, 180 kcal) – Misture cottage + cenoura.', almoco: '☀️ Frango desfiado com pimentão (35g prot, 310 kcal) – Misture frango + pimentão.', lanche: '🌤️ Ovos mexidos com brócolis (25g prot, 230 kcal) – Mexa ovos + brócolis.', jantar: '🌙 Atum com abacate e limão (30g prot, 280 kcal) – Misture atum + abacate.' },
    11: { cafe: '🌅 Peru com folhas verdes (28g prot, 240 kcal) – Grelhe peru + folhas.', almoco: '☀️ Grão-de-bico com ovos (22g prot, 250 kcal) – Misture grão-de-bico + ovos.', lanche: '🌤️ Frango com espinafre e azeite (35g prot, 320 kcal) – Refogue frango + espinafre.', jantar: '🌙 Omelete de sardinha com cebola (30g prot, 270 kcal) – Bata ovos + sardinha + cebola.' },
    12: { cafe: '🌅 Lentilha com queijo cottage (28g prot, 290 kcal) – Misture lentilha + cottage.', almoco: '☀️ Atum com pepino e ervas (30g prot, 220 kcal) – Misture atum + pepino.', lanche: '🌤️ Ovos cozidos com abobrinha (25g prot, 230 kcal) – Cozinhe ovos + abobrinha.', jantar: '🌙 Frango grelhado com cenoura (35g prot, 310 kcal) – Grelhe frango + cenoura.' },
    13: { cafe: '🌅 Cottage com tomate e ervas (25g prot, 180 kcal) – Misture cottage + tomate.', almoco: '☀️ Sardinha com batata-doce assada (28g prot, 320 kcal) – Asse batata-doce + sardinha.', lanche: '🌤️ Shake de aveia + banana + iogurte natural (28g prot, 350 kcal) – Bata tudo com canela.', jantar: '🌙 Panqueca proteica de aveia + claras + canela (25g prot, 280 kcal) – Misture aveia, claras, canela, frite.' },
    14: { cafe: '🌅 Mousse de iogurte natural + cacau + adoçante (20g prot, 180 kcal) – Misture iogurte + cacau em pó + adoçante, leve à geladeira.', almoco: '☀️ Pudim de chia com leite de coco e cacau (22g prot, 250 kcal) – Misture chia + leite + cacau, deixe hidratar.', lanche: '🌤️ Bolinho de aveia + banana + claras (25g prot, 300 kcal) – Amasse banana + aveia + claras, asse.', jantar: '🌙 Sorvete caseiro de iogurte congelado + morangos (20g prot, 200 kcal) – Congele iogurte + frutas, bata.' },
    15: { cafe: '🌅 Cookie proteico de aveia + pasta de amendoim (18g prot, 220 kcal) – Misture aveia + pasta + adoçante, asse.', almoco: '☀️ Creme de abacate com cacau e adoçante (15g prot, 280 kcal) – Bata abacate + cacau.', lanche: '🌤️ Barra de proteína caseira (aveia + manteiga de amendoim + iogurte) (25g prot, 320 kcal) – Misture, refrigere.', jantar: '🌙 Smoothie de morango + iogurte + claras (30g prot, 250 kcal) – Bata tudo.' },
    16: { cafe: '🌅 Panqueca de banana + claras + canela (25g prot, 280 kcal) – Amasse banana + claras, frite.', almoco: '☀️ Mousse de cacau com iogurte e chia (20g prot, 210 kcal) – Misture iogurte + cacau + chia.', lanche: '🌤️ Bolinho de aveia + maçã + claras (25g prot, 290 kcal) – Rale maçã + aveia + claras, asse.', jantar: '🌙 Sorvete de banana congelada + cacau (18g prot, 220 kcal) – Congele banana, bata com cacau.' },
    17: { cafe: '🌅 Cookie de aveia + banana + pasta de amendoim (20g prot, 250 kcal) – Misture e asse.', almoco: '☀️ Pudim de chia com morango (22g prot, 240 kcal) – Chia + iogurte + morango.', lanche: '🌤️ Shake de maçã + iogurte + canela (25g prot, 280 kcal) – Bata maçã + iogurte + canela.', jantar: '🌙 Creme de abacaxi com iogurte (20g prot, 230 kcal) – Bata abacaxi + iogurte.' },
    18: { cafe: '🌅 Barra de aveia + cacau + pasta de amendoim (25g prot, 320 kcal) – Misture e refrigere.', almoco: '☀️ Smoothie de abacate + cacau (22g prot, 280 kcal) – Bata abacate + cacau.', lanche: '🌤️ Panqueca de aveia + morango (25g prot, 290 kcal) – Misture aveia + claras + morango picado.', jantar: '🌙 Mousse de iogurte + baunilha + adoçante (20g prot, 180 kcal) – Misture iogurte + essência baunilha.' },
    19: { cafe: '🌅 Bolinho de banana + cacau (25g prot, 300 kcal) – Amasse banana + cacau + claras.', almoco: '☀️ Sorvete de iogurte + abacaxi (20g prot, 210 kcal) – Congele iogurte + abacaxi.', lanche: '🌤️ Cookie de aveia + maçã (18g prot, 220 kcal) – Misture aveia + maçã ralada.', jantar: '🌙 Pudim de chia + banana (22g prot, 250 kcal) – Chia + banana amassada.' },
    20: { cafe: '🌅 Shake de morango + banana + iogurte (30g prot, 320 kcal) – Bata tudo.', almoco: '☀️ Creme de maçã com canela (20g prot, 230 kcal) – Cozinhe maçã + canela + iogurte.', lanche: '🌤️ Barra de aveia + morango (25g prot, 280 kcal) – Misture aveia + morango picado.', jantar: '🌙 Smoothie de abacaxi + iogurte (22g prot, 240 kcal) – Bata abacaxi + iogurte.' }
};

export function getSemanaAtual(): number {
    // Data de início (primeira semana)
    const dataInicio = new Date('2024-01-01');
    const hoje = new Date();
    const diffDias = Math.floor((hoje.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24));
    const semanasPassadas = Math.floor(diffDias / 7);
    return (semanasPassadas % 14) + 1; // 14 semanas de receitas diferentes (100 receitas / 7 dias)
}

export function getReceitasSemana(): Record<number, MealPlan> {
    const semana = getSemanaAtual();
    const inicio = ((semana - 1) * 7) + 1;
    const receitasSemana: Record<number, MealPlan> = {};
    
    for (let i = 0; i < 7; i++) {
        const dia = inicio + i;
        // Se passar de 20, volta para 1 (cíclico)
        // Adjusting logic to match user request: bancoReceitas[dia] || bancoReceitas[((dia-1) % 20) + 1]
        // Note: The user provided logic assumes keys 1-20 exist. 
        // If dia > 20, we wrap around.
        const receitaDia = bancoReceitas[dia] || bancoReceitas[((dia-1) % 20) + 1];
        
        // We map it to 1-7 for the current week view
        receitasSemana[i + 1] = receitaDia;
    }
    return receitasSemana;
}
