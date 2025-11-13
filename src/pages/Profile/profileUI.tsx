import Avatar from "../../components/atoms/Avatar";
import PostItem from "../../components/molecules/PostItem";
import { Loader2, Pencil } from "lucide-react";
import { useProfile } from "./useProfile";

export default function ProfileUI() {
  const {
    profile,
    isEditing,
    isSaving,
    handleFieldChange,
    handleToggleEdit,
    handleSubmitProfile,
    posts,
    loadingPosts,
    handleDeletePost,
    handleEditPost,
  } = useProfile();

  const styles = {
    page: "w-full flex flex-col items-center gap-10 mt-10 mb-20 px-4",
    profileCard: {
      container:
        "w-full max-w-[960px] bg-[#151515] rounded-[20px] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.35)] flex flex-col lg:flex-row relative",
      left: "lg:w-[260px] bg-[#151515] flex flex-col",
      avatarWrapper: "w-full h-[200px] lg:h-[220px] overflow-hidden",
      nameWrapper: "flex-1 flex items-center justify-center px-6 pb-6 lg:pb-10",
      nameText:
        "font-passion text-white text-[28px] leading-[30px] lg:text-[34px] lg:leading-[36px] text-left break-words",
      right: "flex-1 bg-[#1E1E1E] px-6 py-6 lg:px-10 lg:py-8 flex flex-col gap-4",
      fieldRow: "flex flex-col gap-1",
      fieldLabel: "font-lato text-[13px] text-[#E0E0E0]",
      fieldInput:
        "w-full h-10 rounded-[3px] bg-[#262626] border border-[#3C3C3C] px-3 text-[14px] text-white outline-none focus:border-[#1877F2] disabled:opacity-80",
      fieldTextarea:
        "w-full rounded-[3px] bg-[#262626] border border-[#3C3C3C] px-3 py-2 text-[14px] text-white outline-none focus:border-[#1877F2] min-h-[90px] resize-none disabled:opacity-80",
      editButton:
        "absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1877F2] text-white text-[13px] font-bold hover:bg-[#1668d9] transition disabled:opacity-60 disabled:cursor-not-allowed",
    },
    postsSection: {
      container: "w-full max-w-[960px] flex flex-col gap-6",
      title: "text-center font-passion text-white text-[26px] lg:text-[32px] tracking-wide",
      list: "flex flex-col gap-5",
    },
  };

  return (
    <div className={styles.page}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmitProfile();
        }}
        className={styles.profileCard.container}
      >
        <div className={styles.profileCard.left}>
          <div className={styles.profileCard.avatarWrapper}>
            <Avatar image_url={profile.imageUrl} size={220} />
          </div>
          <div className={styles.profileCard.nameWrapper}>
            <p className={styles.profileCard.nameText}>{profile.name}</p>
          </div>
        </div>

        <div className={styles.profileCard.right}>
          <button
            type="button"
            className={styles.profileCard.editButton}
            onClick={handleToggleEdit}
            disabled={isSaving}
          >
            Editar
            <Pencil className="w-4 h-4" />
          </button>

          <div className={styles.profileCard.fieldRow}>
            <span className={styles.profileCard.fieldLabel}>Nome:</span>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              disabled={!isEditing || isSaving}
              className={styles.profileCard.fieldInput}
            />
          </div>

          <div className={styles.profileCard.fieldRow}>
            <span className={styles.profileCard.fieldLabel}>Idade:</span>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => handleFieldChange("age", e.target.value)}
              disabled={!isEditing || isSaving}
              className={styles.profileCard.fieldInput}
            />
          </div>

          <div className={styles.profileCard.fieldRow}>
            <span className={styles.profileCard.fieldLabel}>URL de imagem do perfil:</span>
            <input
              type="text"
              value={profile.imageUrl}
              onChange={(e) => handleFieldChange("imageUrl", e.target.value)}
              disabled={!isEditing || isSaving}
              className={styles.profileCard.fieldInput}
            />
          </div>

          <div className={styles.profileCard.fieldRow}>
            <span className={styles.profileCard.fieldLabel}>Sobre mim:</span>
            <textarea
              value={profile.about}
              onChange={(e) => handleFieldChange("about", e.target.value)}
              disabled={!isEditing || isSaving}
              className={styles.profileCard.fieldTextarea}
            />
          </div>

          {isEditing && (
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 rounded-md bg-[#1877F2] text-white text-[14px] font-bold hover:bg-[#1668d9] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          )}
        </div>
      </form>

      <section className={styles.postsSection.container}>
        <h2 className={styles.postsSection.title}>Meus posts</h2>

        {loadingPosts ? (
          <div className="flex items-center justify-center gap-2 text-white mt-4">
            <Loader2 className="animate-spin h-5 w-5" />
            Carregando posts...
          </div>
        ) : (
          <div className={styles.postsSection.list}>
            {posts.map((post) => (
              <PostItem key={post.id} post={post} handleDelete={handleDeletePost} handleEdit={handleEditPost} />
            ))}
            {!posts.length && <p className="text-center text-sm text-gray-400">Você ainda não publicou nenhum post.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
