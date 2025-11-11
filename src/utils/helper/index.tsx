import axios from "axios";
import type { TMetaData } from "../../types";

const parseHashtags = (text: string) => {
  const words = text.split(' ');
  
  return words.map((word, index) => {
    if (word.startsWith('#')) return <strong key={index} className="font-bold! text-white!">{word} </strong>
    return `${word} `;
  });
}

export const fetchMetadata = async (url: string): Promise<TMetaData> => {
  try {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const response = await axios.get(`${proxyUrl}${encodeURIComponent(url)}`);
    
    const html = response.data.contents;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const getMetaContent = (property: string): string => {
      const ogTag = doc.querySelector(`meta[property="${property}"]`);
      const nameTag = doc.querySelector(`meta[name="${property}"]`);
      const itemPropTag = doc.querySelector(`meta[itemprop="${property}"]`);
      
      return ogTag?.getAttribute('content') || 
        nameTag?.getAttribute('content') || 
        itemPropTag?.getAttribute('content') || 
        '';
    };
    
    // Extrai os metadados
    const title = getMetaContent('og:title') || 
      getMetaContent('twitter:title') || 
      doc.querySelector('title')?.textContent || 
      '';
                 
    const description = getMetaContent('og:description') || 
      getMetaContent('twitter:description') || 
      getMetaContent('description') || 
      '';
                       
    const image = getMetaContent('og:image') || 
      getMetaContent('twitter:image') || 
      getMetaContent('image') || 
      '';
    
    return {
      title: title.trim(),
      description: description.trim(),
      images: image,
      url,
    };
  } catch (error) {
    console.error('Erro ao buscar metadados:', error);
    return {
      title: 'Ocorreu um erro',
      description: 'Não foi possível obter dados do link compartilhado',
      images: '',
      url,
    };
  }
};

export default parseHashtags