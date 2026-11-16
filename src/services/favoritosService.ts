
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = '@mao_amiga:favoritos';

export async function buscarIdsFavoritos(): Promise<string[]> {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_FAVORITOS);

    if (!dados) {
      return [];
    }

    const ids: unknown = JSON.parse(dados);

    if (!Array.isArray(ids)) {
      return [];
    }

    return ids.filter(
      (id): id is string => typeof id === 'string'
    );
  } catch {
    return [];
  }
}

export async function alternarFavorito(
  id: string
): Promise<boolean> {
  const ids = await buscarIdsFavoritos();

  if (ids.includes(id)) {
    const atualizados = ids.filter(
      (favoritoId) => favoritoId !== id
    );

    await AsyncStorage.setItem(
      CHAVE_FAVORITOS,
      JSON.stringify(atualizados)
    );

    return false;
  }

  await AsyncStorage.setItem(
    CHAVE_FAVORITOS,
    JSON.stringify([...ids, id])
  );

  return true;
}

export async function removerFavorito(id: string): Promise<void> {
  const ids = await buscarIdsFavoritos();

  const atualizados = ids.filter(
    (favoritoId) => favoritoId !== id
  );

  await AsyncStorage.setItem(
    CHAVE_FAVORITOS,
    JSON.stringify(atualizados)
  );
}
