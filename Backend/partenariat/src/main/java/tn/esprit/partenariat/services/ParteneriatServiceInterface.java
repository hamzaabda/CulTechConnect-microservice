package tn.esprit.partenariat.services;

import tn.esprit.partenariat.entities.Parteneriat;

import java.util.List;
import java.util.Optional;

public interface ParteneriatServiceInterface {
    List<Parteneriat> getAllParteneriat();

    Optional<Parteneriat> getParteneriatById(Long id);

    Parteneriat createParteneriat(Parteneriat p);

    public Parteneriat updateParteneriat(Long idParteneriat ,Parteneriat p );

    void deleteParteneriat(Long id);
}
