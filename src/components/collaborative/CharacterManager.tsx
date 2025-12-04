import React, { useState } from 'react';
import { Character } from '../../types/characterAdoption';

interface CharacterManagerProps {
  characters: Character[];
  currentUserId: string;
  onAdoptCharacter: (characterId: string) => void;
  onReleaseCharacter: (characterId: string) => void;
  onEditCharacter: (character: Character) => void;
}

const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Icon components for future use
// const Heart = ({ className }: { className?: string }) => (
//   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//   </svg>
// );

// const Sword = ({ className }: { className?: string }) => (
//   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//   </svg>
// );

const getRoleIcon = (role: Character['role']) => {
  switch (role) {
    case 'protagonist':
      return '⭐';
    case 'antagonist':
      return '💀';
    case 'supporting':
      return '🎭';
    case 'minor':
      return '👤';
  }
};

const getRoleColor = (role: Character['role']) => {
  switch (role) {
    case 'protagonist':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'antagonist':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'supporting':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'minor':
      return 'bg-stone-500/20 text-stone-400 border-stone-500/30';
  }
};

export const CharacterManager: React.FC<CharacterManagerProps> = ({
  characters,
  currentUserId,
  onAdoptCharacter,
  onReleaseCharacter,
  onEditCharacter,
}) => {
  const [filter, setFilter] = useState<'all' | 'available' | 'mine'>('all');

  const filteredCharacters = characters.filter((c) => {
    if (filter === 'available') return !c.ownerId;
    if (filter === 'mine') return c.ownerId === currentUserId;
    return true;
  });

  const myCharacters = characters.filter(c => c.ownerId === currentUserId);
  const availableCharacters = characters.filter(c => !c.ownerId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-100 mb-1">Character Adoption</h2>
          <p className="text-sm text-stone-400">
            Adopt characters to guide their development and have authority over their actions
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-lime-400">{myCharacters.length}</div>
            <div className="text-stone-500">Your Characters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{availableCharacters.length}</div>
            <div className="text-stone-500">Available</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'available', 'mine'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              filter === f
                ? 'bg-lime-500 text-stone-900'
                : 'bg-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.map((character) => {
          const isOwned = !!character.ownerId;
          const isMine = character.ownerId === currentUserId;

          return (
            <div
              key={character.id}
              className={`bg-stone-800/50 rounded-lg border p-5 transition-all ${
                isMine
                  ? 'border-lime-500 shadow-lg shadow-lime-500/20'
                  : isOwned
                  ? 'border-stone-700'
                  : 'border-blue-500/50 hover:border-blue-500'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getRoleIcon(character.role)}</span>
                  <div>
                    <h3 className="font-bold text-stone-100">{character.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleColor(character.role)}`}>
                      {character.role}
                    </span>
                  </div>
                </div>
                {isMine && (
                  <span className="px-2 py-1 bg-lime-500/20 text-lime-400 text-xs rounded-full border border-lime-500/30">
                    Yours
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-stone-400 mb-3 line-clamp-2">
                {character.description}
              </p>

              {/* Traits */}
              {character.traits.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {character.traits.slice(0, 3).map((trait, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-xs rounded border border-purple-500/30"
                    >
                      {trait}
                    </span>
                  ))}
                  {character.traits.length > 3 && (
                    <span className="px-2 py-0.5 text-stone-500 text-xs">
                      +{character.traits.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                <div className="text-center p-2 bg-stone-900/50 rounded">
                  <div className="text-stone-500">Scenes</div>
                  <div className="text-stone-200 font-semibold">{character.sceneCount}</div>
                </div>
                <div className="text-center p-2 bg-stone-900/50 rounded">
                  <div className="text-stone-500">Dialogue</div>
                  <div className="text-stone-200 font-semibold">{character.dialogueCount}</div>
                </div>
                <div className="text-center p-2 bg-stone-900/50 rounded">
                  <div className="text-stone-500">Appears</div>
                  <div className="text-stone-200 font-semibold">{character.totalAppearances}</div>
                </div>
              </div>

              {/* Owner Info */}
              {isOwned && (
                <div className="flex items-center gap-2 mb-3 text-sm text-stone-400">
                  <User className="w-4 h-4" />
                  <span>Adopted by {isMine ? 'you' : character.ownerName}</span>
                </div>
              )}

              {/* Relationships Preview */}
              {character.relationships.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs text-stone-500 mb-1">Relationships</div>
                  <div className="flex gap-1">
                    {character.relationships.slice(0, 3).map((rel, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 bg-stone-900/50 rounded border border-stone-700"
                        title={`${rel.type} with ${rel.characterName}`}
                      >
                        {rel.type === 'ally' && '🤝'}
                        {rel.type === 'enemy' && '⚔️'}
                        {rel.type === 'family' && '👨‍👩‍👧'}
                        {rel.type === 'romantic' && '💕'}
                        {rel.type === 'neutral' && '🤷'}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {!isOwned && (
                  <button
                    onClick={() => onAdoptCharacter(character.id)}
                    className="flex-1 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-medium transition-colors"
                  >
                    Adopt Character
                  </button>
                )}
                {isMine && (
                  <>
                    <button
                      onClick={() => onEditCharacter(character)}
                      className="flex-1 py-2 bg-lime-500 hover:bg-lime-400 text-stone-900 rounded-lg font-medium transition-colors"
                    >
                      Manage
                    </button>
                    <button
                      onClick={() => onReleaseCharacter(character.id)}
                      className="px-4 py-2 bg-stone-700 hover:bg-stone-600 text-stone-300 rounded-lg font-medium transition-colors"
                    >
                      Release
                    </button>
                  </>
                )}
                {isOwned && !isMine && (
                  <button
                    onClick={() => onEditCharacter(character)}
                    className="flex-1 py-2 bg-stone-700 hover:bg-stone-600 text-stone-300 rounded-lg font-medium transition-colors"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCharacters.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No characters found</p>
          <p className="text-sm">
            {filter === 'mine' && 'You haven\'t adopted any characters yet'}
            {filter === 'available' && 'All characters have been adopted'}
            {filter === 'all' && 'No characters in this project yet'}
          </p>
        </div>
      )}
    </div>
  );
};
