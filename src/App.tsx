import React, { useState } from 'react';
import { Search, Library, Home, User, BookOpen, CheckCircle2, XCircle, Star, StarHalf, ChevronLeft, Heart, Settings, LogOut, Clock, BookMarked } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBook, setSelectedBook] = useState<number | null>(null);

  const books = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      status: "available",
      description: "Entre a vida e a morte existe uma biblioteca. E nela, as estantes se estendem infinitamente. Cada livro oferece a chance de experimentar outra vida que você poderia ter vivido e de ver como as coisas teriam sido diferentes se você tivesse feito outras escolhas.",
      rating: 4.5,
      reviews: [
        { user: "Maria S.", rating: 5, comment: "Uma história incrível sobre segundas chances e possibilidades." },
        { user: "João P.", rating: 4, comment: "Reflexivo e emocionante. Recomendo fortemente." }
      ],
      genre: "Ficção Contemporânea",
      pages: 304,
      publishedYear: 2020
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
      status: "borrowed",
      description: "Ryland Grace é o único sobrevivente em uma missão desesperada. Se ele falhar, a humanidade e a Terra inteira perecerão. Mas ele não sabe disso. Ele nem mesmo consegue se lembrar do próprio nome, muito menos a natureza de sua missão ou como realizá-la.",
      rating: 4.8,
      reviews: [
        { user: "Ana R.", rating: 5, comment: "Ficção científica no seu melhor! Não consegui parar de ler." }
      ],
      genre: "Ficção Científica",
      pages: 496,
      publishedYear: 2021,
      borrowDate: "2024-03-10",
      returnDate: "2024-03-24"
    },
    {
      id: 3,
      title: "The Song of Achilles",
      author: "Madeline Miller",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
      status: "available",
      description: "A Grécia na era dos heróis. Pátroclo, um jovem príncipe desajeitado, foi exilado para o reino de Ftia, onde vive à sombra do rei Peleu e seu filho dourado, Aquiles.",
      rating: 4.7,
      reviews: [
        { user: "Carlos M.", rating: 5, comment: "Uma releitura belíssima do mito grego." }
      ],
      genre: "Ficção Histórica",
      pages: 352,
      publishedYear: 2011
    },
    {
      id: 4,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      cover: "https://images.unsplash.com/photo-1531901599143-df5010ab9438?auto=format&fit=crop&q=80&w=400",
      status: "borrowed",
      description: "Do autor vencedor do Prêmio Nobel, uma história inesquecível contada através dos olhos de uma AA (Amiga Artificial) inesquecível, que explora a questão fundamental: o que significa amar?",
      rating: 4.3,
      reviews: [
        { user: "Paula L.", rating: 4, comment: "Uma reflexão profunda sobre humanidade e tecnologia." }
      ],
      genre: "Ficção Literária",
      pages: 320,
      publishedYear: 2021,
      borrowDate: "2024-03-15",
      returnDate: "2024-03-29"
    }
  ];

  const userProfile = {
    name: "Matheus Santos",
    email: "matheus.santos@email.com",
    memberSince: "Janeiro 2024",
    booksRead: 15,
    currentlyBorrowed: 2,
    favoriteGenres: ["Ficção Científica", "Fantasia", "História"],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
  };

  const borrowedBooks = books.filter(book => book.status === "borrowed");

  const getStatusColor = (status: string) => {
    return status === 'available' ? 'text-emerald-500' : 'text-red-500';
  };

  const getStatusIcon = (status: string) => {
    return status === 'available' ? 
      <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : 
      <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getActionButton = (status: string) => {
    return status === 'available' ? (
      <button className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors">
        Reservar
      </button>
    ) : (
      <button className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
        Devolver
      </button>
    );
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-400" />);
    }

    return stars;
  };

  const renderLoansScreen = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 pb-20">
        <header className="bg-blue-950 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-white">Meus Empréstimos</h1>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-6">
            {borrowedBooks.map((book) => (
              <div key={book.id} className="bg-blue-950/50 rounded-xl overflow-hidden shadow-lg">
                <div className="flex">
                  <div className="w-1/3 sm:w-1/4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: '2/3' }}
                    />
                  </div>
                  <div className="w-2/3 sm:w-3/4 p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{book.title}</h3>
                    <p className="text-blue-200 text-sm mb-2">{book.author}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      {renderRatingStars(book.rating)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-blue-300 mr-2" />
                        <span className="text-blue-200">Emprestado em: {book.borrowDate}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <BookMarked className="h-4 w-4 text-blue-300 mr-2" />
                        <span className="text-blue-200">Devolver até: {book.returnDate}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      {getActionButton(book.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderProfileScreen = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 pb-20">
        <header className="bg-blue-950 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-white">Perfil</h1>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-blue-950/50 rounded-xl p-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">{userProfile.name}</h2>
                <p className="text-blue-200">{userProfile.email}</p>
                <p className="text-blue-300 text-sm">Membro desde {userProfile.memberSince}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-900/30 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-white">{userProfile.booksRead}</p>
                <p className="text-blue-200">Livros Lidos</p>
              </div>
              <div className="bg-blue-900/30 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-white">{userProfile.currentlyBorrowed}</p>
                <p className="text-blue-200">Emprestados</p>
              </div>
            </div>

            {/* Favorite Genres */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Gêneros Favoritos</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.favoriteGenres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-blue-800/50 text-blue-100 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-900/50 text-white py-3 rounded-lg hover:bg-blue-800/50 transition-colors">
                <Settings className="h-5 w-5" />
                <span>Configurações</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-red-900/50 text-white py-3 rounded-lg hover:bg-red-800/50 transition-colors">
                <LogOut className="h-5 w-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBookDetail = (book: typeof books[0]) => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 pb-20">
        {/* Back Button */}
        <div className="sticky top-0 bg-blue-950 shadow-lg z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button 
              onClick={() => setSelectedBook(null)}
              className="flex items-center text-white hover:text-blue-200 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="ml-1">Voltar</span>
            </button>
          </div>
        </div>

        {/* Book Cover and Basic Info */}
        <div className="relative">
          <div className="h-96 overflow-hidden">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{book.title}</h1>
                <p className="text-xl text-blue-200 mb-2">{book.author}</p>
                <div className="flex items-center space-x-2">
                  {renderRatingStars(book.rating)}
                  <span className="text-white ml-2">{book.rating}</span>
                </div>
              </div>
              <button className="p-2 rounded-full bg-blue-950/50 hover:bg-blue-800/50 transition-colors">
                <Heart className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-blue-950/50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-900/50 rounded-lg">
                <p className="text-gray-300 text-sm">Gênero</p>
                <p className="text-white font-medium">{book.genre}</p>
              </div>
              <div className="text-center p-4 bg-blue-900/50 rounded-lg">
                <p className="text-gray-300 text-sm">Páginas</p>
                <p className="text-white font-medium">{book.pages}</p>
              </div>
              <div className="text-center p-4 bg-blue-900/50 rounded-lg">
                <p className="text-gray-300 text-sm">Ano</p>
                <p className="text-white font-medium">{book.publishedYear}</p>
              </div>
              <div className="text-center p-4 bg-blue-900/50 rounded-lg">
                <p className="text-gray-300 text-sm">Status</p>
                <p className={`font-medium ${getStatusColor(book.status)}`}>
                  {book.status === 'available' ? 'Disponível' : 'Alugado'}
                </p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-white mb-3">Sobre o livro</h2>
            <p className="text-blue-100 leading-relaxed mb-6">{book.description}</p>

            <div className="mb-6">
              {getActionButton(book.status)}
            </div>

            <h2 className="text-xl font-semibold text-white mb-4">Avaliações</h2>
            <div className="space-y-4">
              {book.reviews.map((review, index) => (
                <div key={index} className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{review.user}</p>
                    <div className="flex items-center">
                      {renderRatingStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-blue-100">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHomeScreen = () => {
    return (
      <>
        {/* Header */}
        <header className="bg-blue-950 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-white" />
                <h1 className="text-2xl font-bold text-white">Bookline</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-blue-700 rounded-xl bg-blue-950/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Buscar livros por título, autor ou ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {books.map((book) => (
              <div 
                key={book.id} 
                className="bg-blue-950/50 rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-200"
                onClick={() => setSelectedBook(book.id)}
              >
                <div className="relative aspect-[2/3]">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-950/80 rounded-full p-1">
                    {getStatusIcon(book.status)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium text-sm mb-1">{book.title}</h3>
                  <p className="text-gray-300 text-xs mb-2">{book.author}</p>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`text-xs font-medium ${getStatusColor(book.status)}`}>
                      {book.status === 'available' ? 'Disponível' : 'Alugado'}
                    </span>
                  </div>
                  {getActionButton(book.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800">
      {selectedBook !== null ? (
        renderBookDetail(books.find(book => book.id === selectedBook)!)
      ) : (
        <>
          {activeTab === 'home' && renderHomeScreen()}
          {activeTab === 'loans' && renderLoansScreen()}
          {activeTab === 'profile' && renderProfileScreen()}

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-blue-950 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-around py-3">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`flex flex-col items-center space-y-1 ${
                    activeTab === 'home' ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  <Home className="h-6 w-6" />
                  <span className="text-xs">Início</span>
                </button>
                <button
                  onClick={() => setActiveTab('loans')}
                  className={`flex flex-col items-center space-y-1 ${
                    activeTab === 'loans' ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  <Library className="h-6 w-6" />
                  <span className="text-xs">Meus Empréstimos</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex flex-col items-center space-y-1 ${
                    activeTab === 'profile' ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  <User className="h-6 w-6" />
                  <span className="text-xs">Perfil</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Bottom Padding for Navigation */}
          <div className="h-16"></div>
        </>
      )}
    </div>
  );
}

export default App;