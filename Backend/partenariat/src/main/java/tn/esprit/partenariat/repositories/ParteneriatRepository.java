package tn.esprit.partenariat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.partenariat.entities.Parteneriat;

public interface ParteneriatRepository extends JpaRepository<Parteneriat, Long> {
}